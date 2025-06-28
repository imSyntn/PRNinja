import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { msg: "userId is not given." },
      { status: 400 }
    );
  }

  try {
    const data = await prisma.pR_Review.findMany({where: {userId: parseInt(userId)}})

    return NextResponse.json(data, {status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
