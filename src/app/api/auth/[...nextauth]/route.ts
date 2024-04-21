import { authOptions } from "@/lib/config/auth";
import NextAuth from "next-auth/next";

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
