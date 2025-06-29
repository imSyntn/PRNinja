import { NextRequest, NextResponse } from "next/server";
import { runAIReview } from "@/app/services/codeReview";
import { prisma } from "@/app/lib/prisma";
import { redis } from "@/app/lib/redis";
import { userSelect } from "@/app/lib/constants";

const checkUser = async (installationId: number) => {
  const cached: any = await redis.hgetall(`${installationId}`);

  if (cached && Object.keys(cached).length > 0) {
    return cached;
  }

  const userAuthenticated = await prisma.user.findFirst({
    where: { installationId },
    select: userSelect,
  });

  if (userAuthenticated) {
    await redis.hset(`${installationId}`, userAuthenticated);
    await redis.expire(`${installationId}`, 604800);

  }

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
      const userData = await prisma.user.update({
        where: { accountId: `${payload.installation.account.id}` },
        data: {
          installationId: payload.installation.id,
          accountLogin: payload.installation.account.login,
        },
        select: userSelect,
      });

      await redis.hset(`${userData.installationId}`, userData);
      await redis.hset(userData.email, userData);
      await redis.expire(`${userData.installationId}`, 604800);
      await redis.expire(userData.email, 604800);

      return NextResponse.json({ msg: "Installation done." }, { status: 200 });
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
