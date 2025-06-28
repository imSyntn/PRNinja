import { createAppAuth } from "@octokit/auth-app";
import { request } from "@octokit/request";

const appId: string = process.env.APP_ID!;
const privateKey: string = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n")!;

export const getInstallationToken = async (installationID: number) => {
  console.log("🔃 Getting Token");
  try {
    const auth = createAppAuth({
      appId,
      privateKey,
    });
    const { token } = await auth({
      type: "installation",
      installationId: installationID,
    });
    console.log("✅ Token generated");
    return token;
  } catch (error: any) {
    console.error("❌ Failed to generate installation token:", error.message); // 🔄 better error logging
    throw error;
  }
};

export const getPRDiff = async ({
  installationID,
  owner,
  repo,
  pull_number,
}: {
  installationID: number;
  owner: string;
  repo: string;
  pull_number: number;
}) => {
  try {
    console.log("🔃 Getting Diff");
    const token = await getInstallationToken(installationID);

    const { data: PR_Data } = await request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        headers: {
          authorization: `token ${token}`,
        },
        owner,
        repo,
        pull_number,
      }
    );

    if (!PR_Data?.diff_url) {
      // 🔄 validated diff_url presence
      throw new Error("Missing diff_url in PR data.");
    }

    const diffResponse = await fetch(PR_Data.diff_url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3.diff",
      },
    });

    const diff = await diffResponse.text();

    if (!diff) {
      // 🔄 validate empty diff
      throw new Error("Failed to fetch diff content.");
    }

    console.log("🔥🔥 \n", diff);
    console.log("✅ Diff Got.");
    return {diff, PR_Data};
  } catch (error: any) {
    console.error("❌ Error fetching PR diff:", error.message); // 🔄 consistent error log
    throw error;
  }
};

export const postPRComment = async ({
  installationID,
  owner,
  repo,
  pull_number,
  body,
}: {
  installationID: number;
  owner: string;
  repo: string;
  pull_number: number;
  body: string;
}) => {
  try {
    console.log("🔃 Posting PR comment.");
    const token = await getInstallationToken(installationID);

    const result = await request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        headers: {
          authorization: `token ${token}`,
        },
        owner,
        repo,
        issue_number: pull_number,
        body,
      }
    );

    if (!result?.data?.id) {
      // 🔄 check for missing comment id
      throw new Error("Comment failed, no comment ID returned.");
    }

    console.log("✅ PR Comment added.");
    return result;
  } catch (error: any) {
    console.error("❌ Error posting PR comment:", error.message); // 🔄 consistent error log
    throw error;
  }
};
