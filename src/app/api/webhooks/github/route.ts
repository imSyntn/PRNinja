import { NextRequest, NextResponse } from "next/server";
// import { getPRDiff } from "@/app/lib/github";
import { runAIReview } from "@/app/services/codeReview";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  console.log("Webhook Triggered.");

  if (payload.zen) {
    return NextResponse.json({ msg: "Pong" }, { status: 200 });
  }

  const { action, installation, pull_request, repository
  } = payload;

  console.log({
    installationID: installation.id,
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: pull_request.number,
  })

  if (action === "opened" || action === "synchronize") {
    // getPRDiff({
    //   installationID: installation.id,
    //   owner: repository.owner.login,
    //   repo: repository.name,
    //   pull_number: pull_request.id,
    // })
    try {
      const reviewResult = await runAIReview({
        installationID: installation.id,
        owner: repository.owner.login,
        repo: repository.name,
        pull_number: pull_request.number,
      })

      return NextResponse.json({msg: reviewResult},{status: 200})
    } catch (error: any) {
      return NextResponse.json({msg: error.message},{status: 500})
    }
  }

  return NextResponse.json({msg: "PR not opened or synced"},{status: 400})
}
