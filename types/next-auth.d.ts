import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      // ... other user properties
    } & DefaultSession["user"];
  }
}
