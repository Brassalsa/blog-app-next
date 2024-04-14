"use client";

import SignInCard from "@/components/SignInCard";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.back();
  }

  return (
    <div className="flex flex-col py-16 gap-3 justify-center items-center">
      <h3 className="font-semibold text-2xl">Sign in/up with</h3>
      <SignInCard
        className="bg-orange-600 text-white"
        handleClick={() => signIn("google")}
      >
        Google
      </SignInCard>
      <SignInCard
        className="bg-black text-white"
        handleClick={() => signIn("github")}
      >
        Github
      </SignInCard>
      <SignInCard
        className="bg-blue-500 text-white"
        handleClick={() => signIn("facebook")}
      >
        Facebook
      </SignInCard>
    </div>
  );
}

export default SignIn;
