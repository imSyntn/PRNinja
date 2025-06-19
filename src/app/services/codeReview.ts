import { getPRDiff, postPRComment } from "@/app/lib/github";
import openai from "@/app/lib/Models/openai";
import { NextResponse } from "next/server";
// import Gemini from "../lib/Models/gemini";

export const runAIReview = async ({
  installationID,
  owner,
  repo,
  pull_number,
}: {
  installationID: number;
  owner: string;
  repo: string;
  pull_number: number;
}) => {
  try {
    console.log("🔃 Starting Review.");

    if (!installationID || !owner || !repo || !pull_number) {
      console.error("❌ Missing required parameters.");
      return NextResponse.json({ msg: "Invalid input" }, { status: 400 });
    }

    const diff = await getPRDiff({ installationID, owner, repo, pull_number });

    if (!diff) {
      console.error("❌ Failed to fetch PR diff.");
      return NextResponse.json(
        { msg: "Unable to fetch PR diff." },
        { status: 500 }
      );
    }

    console.log("🔃 Calling API.");

    const systemPrompt =
      "You are a senior code reviewer. Identify bugs, improvements, and security risks.";

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
      console.log("❌ API Result Error.");
      return NextResponse.json({ msg: "API Result Error." }, { status: 500 });
    }
    console.log("✅ Result given by API.");
    console.log("🔥🔥", commentBody);

    const comment = await postPRComment({
      installationID,
      owner,
      repo,
      pull_number,
      body: commentBody,
    });

    if (!comment.data.id) {
      return NextResponse.json({ msg: "Error in comment" }, { status: 500 });
    }
    console.log("✅ Review Completed.");
    return { diffSize: diff.length, diff: diff, commentBody };
  } catch (error: any) {
    console.error(
      "🔥 Exception caught in runAIReview:",
      error.message || error
    );
    return NextResponse.json({ msg: "Unexpected error." }, { status: 500 });
  }
};
