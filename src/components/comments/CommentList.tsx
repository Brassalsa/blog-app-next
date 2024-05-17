"use client";
import { useSession } from "next-auth/react";
import Comment from "./Comment";
import { CommentType } from "@/types";

export default function CommentList({ comments }: { comments: CommentType[] }) {
  const { data } = useSession();
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          showMenu={data?.user?.email === comment.author.email}
        />
      ))}
    </div>
  );
}
