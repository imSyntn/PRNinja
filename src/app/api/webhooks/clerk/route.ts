import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    if (type !== "user.created") {
      return NextResponse.json({ msg: "Invalid Webhook." }, { status: 400 });
    }

    console.log("clerk webhook triggered.");

    const {
      first_name,
      image_url,
      last_name,
      email_addresses: [{ email_address }],
      external_accounts: [{ provider_user_id }],
    } = data;

    if(!provider_user_id || !email_address) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    try {
      await prisma.user.create({
        data: {
          email: email_address,
          name: first_name + " " + last_name,
          pic: image_url,
          accountId: provider_user_id,
        },
      });

      return NextResponse.json({ msg: "Ok." }, { status: 200 });
    } catch (error) {
      console.error("Webhook Error:", error);
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 500 });
  }
}
