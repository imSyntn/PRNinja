import { getPRDiff, postPRComment } from "@/app/lib/github";
import { PRReviewDataType } from "@/types/dashboard";
import openai from "@/app/lib/Models/openai";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { redis } from "@/app/lib/redis";
// import Gemini from "../lib/Models/gemini";

const getPreviousReviews = async (userId: string) => {
  const cached: string | null = await redis.get(userId);

  if (typeof cached === "string" && cached.trim() !== "") {
    return JSON.parse(cached);
  }

  if (typeof cached === "object" && cached !== null) {
    return cached;
  }

  const data = await prisma.pR_Review.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { date: "desc" },
  });

  await redis.set(userId, JSON.stringify(data || []));
  await redis.expire(userId, 604800);

  return data;
};

const updateDB = async (
  userId: number,
  repo: string,
  link: string,
  title: string,
  filesChanged: number,
  status: string,
  suggestions: string,
  previousData: PRReviewDataType[]
) => {
  const updData = await prisma.pR_Review.create({
    data: {
      userId,
      repo,
      link,
      title,
      filesChanged,
      status,
      suggestions,
    },
  });

  await redis.set(`${userId}`, JSON.stringify([updData, ...previousData]));
  await redis.expire(`${userId}`, 604800);
};

const statusUpdate = async (
  userId: number,
  repo: string,
  filesChanged: number,
  status: string,
  previousData: PRReviewDataType[]
) => {
  const currentStatus = {
    userId,
    repo,
    link: "",
    title: "",
    filesChanged,
    status,
    suggestions: "",
  };

  await redis.set(
    `${userId}`,
    JSON.stringify([currentStatus, ...previousData])
  );
  await redis.expire(`${userId}`, 36000);
};

export const runAIReview = async ({
  installationID,
  owner,
  repo,
  pull_number,
  userId,
}: {
  installationID: number;
  owner: string;
  repo: string;
  pull_number: number;
  userId: number;
}) => {
  try {
    const previousData = await getPreviousReviews(`${userId}`);

    if (!installationID || !owner || !repo || !pull_number) {
      await updateDB(
        userId,
        repo,
        "",
        "",
        0,
        "Failed",
        "❌ Missing required parameter installationID or owner or repo or pull_number.",
        previousData
      );
      return NextResponse.json({ msg: "Invalid input" }, { status: 400 });
    }

    await statusUpdate(userId, repo, 0, "Getting diff.", previousData);

    const { diff, PR_Data } = await getPRDiff({
      installationID,
      owner,
      repo,
      pull_number,
    });

    if (!diff) {
      await updateDB(
        userId,
        repo,
        "",
        "",
        0,
        "Failed",
        "❌ Failed to fetch PR diff.",
        previousData
      );
      return NextResponse.json(
        { msg: "Unable to fetch PR diff." },
        { status: 500 }
      );
    }

    await statusUpdate(userId, repo, 0, "Reviewing.", previousData);

    const systemPrompt =
      "You are a senior code reviewer. Review the provided code diff for bugs, security risks, and improvements. Respond only with a numbered list of brief, actionable suggestions. If a code change is suggested, include the improved code inside a markdown-style codeblock using triple backticks (```). Do not include reasoning, explanations, or analysis.";

    const aiReview = await openai.chat.completions.create({
      //  🚀  OpenAI
      // model: "gpt-4o",
      model: "deepseek/deepseek-r1-0528:free", // 🚀 Open router
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: diff },
      ],
    });

    const commentBody = aiReview.choices[0].message.content;

    // const aiReview = await Gemini.models.generateContent({ //  🚀  Gemini
    //   model: "gemini-2.5-flash",
    //   contents: [
    //     {
    //       role: "user",
    //       parts: [
    //         { text: "You are a senior code reviewer. Identify bugs, improvements, and security risks." },
    //         { text: diff },
    //       ],
    //     },
    //   ],
    // });

    // const commentBody = aiReview.text;

    if (!commentBody) {
      await updateDB(
        userId,
        repo,
        "",
        PR_Data.title,
        0,
        "Failed",
        "❌ API Result Error.",
        previousData
      );
      return NextResponse.json({ msg: "API Result Error." }, { status: 500 });
    }

    await statusUpdate(userId, repo, 0, "Commenting.", previousData);

    const comment = await postPRComment({
      installationID,
      owner,
      repo,
      pull_number,
      body: commentBody,
    });

    if (!comment.data.id) {
      await updateDB(
        userId,
        repo,
        "",
        PR_Data.title,
        0,
        "Failed",
        "❌Error in comment.",
        previousData
      );
      return NextResponse.json({ msg: "Error in comment." }, { status: 500 });
    }

    await updateDB(
      userId,
      repo,
      comment.data.html_url,
      PR_Data.title,
      PR_Data.changed_files,
      "Success",
      commentBody,
      previousData
    );

    return { diffSize: diff.length, diff: diff, commentBody };
  } catch (error: any) {
    console.error(
      "🔥 Exception caught in runAIReview:",
      error.message || error
    );

    const previousData = await getPreviousReviews(`${userId}`);

    await updateDB(
      userId,
      repo,
      "",
      "",
      0,
      "Error",
      "❌ Exception caught in Review.",
      previousData
    );

    return NextResponse.json({ msg: "Unexpected error." }, { status: 500 });
  }
};
