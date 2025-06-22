import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_AUTH_CLIENT_ID!;
const clientSecret = process.env.GITHUB_AUTH_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
    }),
  ],
  pages: {
    signIn: "/get-started", // custom login page
    signOut: "/", // after logout
    error: "/error", // error page
    verifyRequest: "/verify-email",
    // newUser: "/onboarding", // first-time signup redirect
  },
};

// export default NextAuth(authOptions)

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
