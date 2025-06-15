import { NextRequest, NextResponse } from "next/server";
import { getPRDiff } from "@/app/lib/github";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  console.log(payload);

  if (payload.zen) {
    return NextResponse.json({ msg: "Pong" }, { status: 200 });
  }

  const { action, installation, pull_request } = payload;

  if (action === "opened" || action === "synchronize") {
    
  }
}
