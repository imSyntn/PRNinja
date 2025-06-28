import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ msg: "Invalid email." }, { status: 400 });
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

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = await request.json();

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

  if (!email || !updates)
    return NextResponse.json({ msg: "Email or Data not given." }, { status: 400 });

  try {
    const userData = await prisma.user.update({
      where: { email },
      data: updates,
    });

    if (!userData) {
      return NextResponse.json({ msg: "Invalid user." }, { status: 400 });
    }

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
