import { getPRDiff, postPRComment } from "@/app/lib/github";
import openai from "@/app/lib/openai";
import { NextResponse } from "next/server";

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
    const diff = await getPRDiff({ installationID, owner, repo, pull_number });

    console.log("🔃 Calling API.");
    const aiReview = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a senior code reviewer. Identify bugs, improvements, and security risks.",
        },
        { role: "user", content: diff },
      ],
    });

    const commentBody = aiReview.choices[0].message.content;

    if (!commentBody) {
      return NextResponse.json({ msg: "API Result Error." }, { status: 500 });
    }
    console.log("✅ Result given by API.");

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
    return { diffSize: diff.length, commentBody };
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Error" }, { status: 500 });
  }
};
