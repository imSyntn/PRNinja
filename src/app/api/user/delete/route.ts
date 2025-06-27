import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function DELETE(request: NextRequest) {
  const {userId} = await request.json();

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
