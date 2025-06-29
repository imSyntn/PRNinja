import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { redis } from "@/app/lib/redis";
import { userSelect } from "../webhooks/github/route";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({ msg: "Unauthorized." }, { status: 401 });
    }

    if (!email) {
      return NextResponse.json({ msg: "Invalid email." }, { status: 400 });
    }

    const cached = await redis.hgetall(email);

    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }

    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        installationId: true,
        accountLogin: true,
        accountId: true,
        reviewPreference: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ msg: "Invalid user." }, { status: 400 });
    }

    await redis.hset(email, userData);
    await redis.expire(email, 604800);

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { userId: clerkUserId } = await auth();

  const { userId } = await request.json();

  if (!clerkUserId) {
    return NextResponse.json({ msg: "Unauthorized." }, { status: 401 });
  }

  if (!userId)
    return NextResponse.json({ msg: "UserID not given." }, { status: 400 });

  try {
    const client = await clerkClient();
    await client.users.deleteUser(userId);
    return Response.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Error deleting user" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { email, updates } = await request.json();
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return NextResponse.json({ msg: "Unauthorized." }, { status: 401 });
  }

  if (!email || !updates)
    return NextResponse.json(
      { msg: "Email or Data not given." },
      { status: 400 }
    );

  try {
    const userData = await prisma.user.update({
      where: { email },
      data: updates,
      select: userSelect
    });

    if (!userData) {
      return NextResponse.json({ msg: "Invalid user." }, { status: 400 });
    }

    await redis.hset(email, userData);
    await redis.hset(`${userData.installationId}`, userData);
    await redis.expire(email, 604800);
    await redis.expire(`${userData.installationId}`, 604800);

    const returnData = Object.keys(updates).reduce(
      (acc: { [key: string]: any }, key: string) => {
        acc[key] = (userData as any)[key];
        return acc;
      },
      {}
    );

    return NextResponse.json(returnData, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Error." }, { status: 500 });
  }
}
