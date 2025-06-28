export interface PRReviewDataType {
  id: string;
  repo: string;
  title: string;
  status: "Reviewed" | "Issues Found" | "Pending";
  suggestions: string;
  link: string;
  date: string;
}

export interface UserDataType {
  id: number;
  email: string;
  name: string;
  plan: string;
  installationId: number;
  accountLogin: string;
  accountId: number;
  reviewPreference: string;
}

export type ConnectedRepoType = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  permissions: {
    pulls: string;
    metadata: string;
  };
  private: boolean;
};
