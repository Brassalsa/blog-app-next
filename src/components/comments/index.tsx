"use client";

import { useSession } from "next-auth/react";
import React from "react";

import ButtonLink from "../ui/buttonLink";

import { cn } from "@/lib/utils";
import { links } from "@/lib/routes";

import CommentList from "./CommentList";
import WriteComment from "./WriteComment";

type Props = {
  postId: string;
  className?: string;
  comments: CommentType[];
};

export default function Comments({ comments, className, postId }: Props) {
  const { status } = useSession();

  return (
    <div className={cn("mt-10 w-full space-y-4", className)}>
      <h2 className="heading">Comments</h2>
      {status === "authenticated" ? (
        <WriteComment postId={postId} />
      ) : (
        <ButtonLink href={links.signIn} className="text-center w-full">
          <h1>Login to write comments</h1>
        </ButtonLink>
      )}
      <CommentList comments={comments} />
    </div>
  );
}
