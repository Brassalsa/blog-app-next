"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
function SignOut({ className }: Props) {
  return (
    <Button
      className={cn("bg-red-500 text-white hover:bg-red-400", className)}
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
}

export default SignOut;
