import { createAppAuth } from "@octokit/auth-app";
import { request } from "@octokit/request";

const appId: string = process.env.APP_ID!;
const privateKey: string = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n")!;

export const getInstallationToken = async (installationID: number) => {
  console.log("🔃 Getting Token");
  const auth = createAppAuth({
    appId,
    privateKey,
  });
  const { token } = await auth({ type: "installation", installationId: installationID });
  console.log("✅ Token generated");
  return token;
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

  const diffResponse = await fetch(PR_Data.diff_url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3.diff",
    },
  });

  const diff = await diffResponse.text();
  console.log("🔥🔥 \n", diff)
  console.log("✅ Diff Got.");
  return diff;
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
console.log("✅ PR Comment added.");
  return result;
};
