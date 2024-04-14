import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { checkEnvVarsOrThrow } from "@/lib/utils/helpers";

export const authOptions: AuthOptions = {
  //@ts-expect-error
  adapter: PrismaAdapter(new PrismaClient()),
  providers: [
    GoogleProvider({
      clientId: checkEnvVarsOrThrow(process.env.GOOGLE_ID),
      clientSecret: checkEnvVarsOrThrow(process.env.GOOGLE_SECRET),
    }),
    GitHubProvider({
      clientId: checkEnvVarsOrThrow(process.env.GITHUB_ID),
      clientSecret: checkEnvVarsOrThrow(process.env.GITHUB_SECRET),
    }),
    FacebookProvider({
      clientId: checkEnvVarsOrThrow(process.env.FACEBOOK_ID),
      clientSecret: checkEnvVarsOrThrow(process.env.FACEBOOK_SECRET),
    }),
  ],
};

export const getAuthSession = async () => await getServerSession(authOptions);
