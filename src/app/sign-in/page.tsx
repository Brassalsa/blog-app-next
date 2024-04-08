"use client";

import { cn } from "@/lib/utils";
import React from "react";

function SignIn() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <h3 className="font-semibold text-2xl">Sign in/up with</h3>
      <SignInCard className="bg-orange-600 text-white">Google</SignInCard>
      <SignInCard className="bg-black text-white">Github</SignInCard>
    </div>
  );
}

type Props = {
  className?: string;
  children: React.ReactNode;
  hanldeClick?: Function;
};
function SignInCard({ className, children, hanldeClick }: Props) {
  return (
    <button
      onClick={() => hanldeClick?.()}
      className={cn("m-2 p-2 rounded-md", className)}
    >
      {children}
    </button>
  );
}

export default SignIn;
