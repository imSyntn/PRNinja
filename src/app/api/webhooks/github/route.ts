import { NextRequest, NextResponse } from "next/server";
import { runAIReview } from "@/app/services/codeReview";
import { prisma } from "@/app/lib/prisma";

const checkUser = async (installationId: number) => {
  const userAuthenticated = await prisma.user.findFirst({
    where: { installationId },
  });

  return userAuthenticated;
};

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const event = request.headers.get("x-github-event");

  console.log("Webhook Triggered:", event);

  if (payload.zen) {
    return NextResponse.json({ msg: "Pong" }, { status: 200 });
  }

  try {
    if (event === "installation" && payload.action === "created") {
      console.log(payload.installation.account.id);
      await prisma.user.update({
        where: { accountId: `${payload.installation.account.id}` },
        data: {
          installationId: payload.installation.id,
          accountLogin: payload.installation.account.login,
        },
      });
    }

    if (
      event === "pull_request" &&
      (payload.action === "opened" || payload.action === "synchronize")
    ) {
      const { installation, pull_request, repository } = payload;

      const userAuthenticated = await checkUser(installation.id);

      if (!userAuthenticated) {
        return NextResponse.json(
          { msg: "User is not registered." },
          { status: 400 }
        );
      }

      if (userAuthenticated.reviewPreference != "auto") {
        return NextResponse.json(
          { msg: "Manual review preference is selected." },
          { status: 422 }
        );
      }

      const reviewResult = await runAIReview({
        installationID: installation.id,
        owner: repository.owner.login,
        repo: repository.name,
        pull_number: pull_request.number,
        userId: userAuthenticated.id,
      });

      return NextResponse.json({ msg: reviewResult }, { status: 200 });
    }

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

        const userAuthenticated = await checkUser(installation.id);

        if (!userAuthenticated) {
          return NextResponse.json(
            { msg: "User is not registered." },
            { status: 400 }
          );
        }

        if (userAuthenticated.reviewPreference != "manual") {
          return NextResponse.json(
            { msg: "Auto review preference is selected." },
            { status: 422 }
          );
        }

        const reviewResult = await runAIReview({
          installationID: installation.id,
          owner: repository.owner.login,
          repo: repository.name,
          pull_number: pull_request.number,
          userId: userAuthenticated.id,
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
