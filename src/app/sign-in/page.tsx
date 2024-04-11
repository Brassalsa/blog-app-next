"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";

function SignIn() {
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

type Props = {
  className?: string;
  children: React.ReactNode;
  handleClick?: Function;
};
function SignInCard({ className, children, handleClick }: Props) {
  return (
    <button
      onClick={() => handleClick?.()}
      className={cn(
        "m-2 p-2 w-32 rounded-md hover:opacity-75 transition-opacity duration-200 border border-primary",
        className
      )}
    >
      {children}
    </button>
  );
}

export default SignIn;
