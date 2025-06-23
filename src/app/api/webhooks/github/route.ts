import { NextRequest, NextResponse } from "next/server";
import { runAIReview } from "@/app/services/codeReview";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const event = request.headers.get("x-github-event");

  console.log("Webhook Triggered:", event);

  if (payload.zen) {
    return NextResponse.json({ msg: "Pong" }, { status: 200 });
  }

  try {
    // console.log('🔥🔥🔥🔥', payload.action)

    if (event === "installation" && payload.action === "created") {
      // dbCall()
    }

    if (
      event === "pull_request" &&
      (payload.action === "opened" || payload.action === "synchronize")
    ) {
      const { installation, pull_request, repository } = payload;

      // console.log("PR Opened or Synced:",{ installation, pull_request, repository });

      const reviewResult = await runAIReview({
        installationID: installation.id,
        owner: repository.owner.login,
        repo: repository.name,
        pull_number: pull_request.number,
      });

      return NextResponse.json({ msg: reviewResult }, { status: 200 });
    }

    // issue_comment 🔥🔥🔥🔥

    if (
      event === "pull_request_review_comment" &&
      payload.action === "created"
    ) {
      if (/@pr[_ ]?ninja/i.test(payload.comment.body)) {
        const { installation, pull_request, repository } = payload;

        console.log("Tagged Comment on PR:", {
          installation,
          pull_request,
          repository,
        });

        const reviewResult = await runAIReview({
          installationID: installation.id,
          owner: repository.owner.login,
          repo: repository.name,
          pull_number: pull_request.number,
        });

        return NextResponse.json({ msg: reviewResult }, { status: 200 });
      }
    }

    return NextResponse.json({ msg: "No relevant event" }, { status: 200 });
  } catch (error: any) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
