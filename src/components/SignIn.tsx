"use client";
import { cn } from "@/lib/utils";
import { PropsWithClassName, Cb } from "@/types";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaceBookSVG,
  GitHubSVG,
  GoogleSVG,
  SvgType,
} from "@/components/ui/svg";

function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col py-16 gap-3 justify-center items-center">
      <h3 className="font-semibold text-2xl">Sign in/up with</h3>
      <SignIn.Button
        className="border-orange-600 flex justify-center items-center gap-2 group overflow-hidden"
        onClick={() => signIn("google")}
        SvgIcon={GoogleSVG}
        label="Google"
      />

      <SignIn.Button
        className="border-black dark:border-white flex justify-center items-center gap-2 group overflow-hidden"
        onClick={() => signIn("github")}
        SvgIcon={GitHubSVG}
        label="Github"
      />
      <SignIn.Button
        className="border-blue-500 "
        onClick={() => signIn("facebook")}
        SvgIcon={FaceBookSVG}
        label="Facebook"
      />
    </div>
  );
}

export default SignIn;

type Props = PropsWithClassName & {
  onClick: Cb;
  SvgIcon: React.FC<SvgType>;
  label: string;
};

SignIn.Button = ({ className, SvgIcon, label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "m-2 p-2 w-36 rounded-md border-2 border-primary rounded-r-full rounded-l-full flex justify-center items-center gap-2 group overflow-hidden",
        className
      )}
    >
      <SvgIcon
        height={25}
        className="-translate-x-14 group-hover:translate-x-0 transition-all duration-300"
      />
      <span className="-translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        {label}
      </span>
    </button>
  );
};
