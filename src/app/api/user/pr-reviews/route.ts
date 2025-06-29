import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { redis } from "@/app/lib/redis";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const { userId: clerkUserId } = await auth();

  if (!userId) {
    return NextResponse.json({ msg: "userId is not given." }, { status: 400 });
  }

  if (!clerkUserId) {
    return NextResponse.json({ msg: "Unauthorized." }, { status: 401 });
  }

  try {
    const cached: string | null = await redis.get(userId);

    if (typeof cached === "string" && cached.trim() !== "") {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }

    if (typeof cached === "object" && cached !== null) {
      return NextResponse.json(cached, { status: 200 });
    }

    const data = await prisma.pR_Review.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { date: "desc" },
    });

    await redis.set(userId, JSON.stringify(data || []));
    await redis.expire(userId, 604800);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
