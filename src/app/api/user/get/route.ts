import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ msg: "Invalid email." }, { status: 400 });
    }

    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
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

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
