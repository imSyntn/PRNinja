import { NextRequest, NextResponse } from "next/server";
import { getInstallationToken } from "@/app/lib/github";
import * as Octokit from "@octokit/request"

export async function GET(request: NextRequest) {
  const installationId = request.nextUrl.searchParams.get("installationId");

  if (!installationId) {
    return NextResponse.json(
      { msg: "InstallationId is not given." },
      { status: 400 }
    );
  }

  try {
    const token = await getInstallationToken(parseInt(installationId));

    const result = await Octokit.request("GET /installation/repositories", {
      headers: {
        authorization: `token ${token}`,
        accept: "application/vnd.github+json",
      },
    });

    return NextResponse.json(result)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
