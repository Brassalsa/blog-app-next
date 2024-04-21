import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { checkEnvOrThrow } from "@/lib/utils/helpers";

export const authOptions: AuthOptions = {
  //@ts-expect-error
  adapter: PrismaAdapter(new PrismaClient()),
  providers: [
    GoogleProvider({
      clientId: checkEnvOrThrow(process.env.GOOGLE_ID),
      clientSecret: checkEnvOrThrow(process.env.GOOGLE_SECRET),
    }),
    GitHubProvider({
      clientId: checkEnvOrThrow(process.env.GITHUB_ID),
      clientSecret: checkEnvOrThrow(process.env.GITHUB_SECRET),
    }),
    FacebookProvider({
      clientId: checkEnvOrThrow(process.env.FACEBOOK_ID),
      clientSecret: checkEnvOrThrow(process.env.FACEBOOK_SECRET),
    }),
  ],
};
