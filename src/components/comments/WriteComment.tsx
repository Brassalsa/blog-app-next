"use client";

import { useToast } from "@/hooks/use-toast";
import { addComment } from "@/lib/services/server/comment.controller";
import { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import ButtonLink from "../ui/buttonLink";
import { links } from "@/lib/routes";

export default function WriteComment({ postId }: { postId: string }) {
  const { toast } = useToast();
  const { status } = useSession();
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    const res = await addComment(postId, comment);
    if (!res.data) {
      toast({
        title: "Add comment",
        description: res.err,
        className: "text-red-400",
      });
    } else {
      toast({
        title: "Add comment",
        description: "Comment added successfully",
      });
      setComment("");
    }
  };

  if (status !== "authenticated") {
    return (
      <ButtonLink href={links.signIn} className="text-center w-full">
        <h1>Login to write comments</h1>
      </ButtonLink>
    );
  }

  return (
    <div className="max-w-5xl">
      <form className="flex gap-2 flex-col sm:flex-row" onSubmit={handleSubmit}>
        <Label className="sr-only" htmlFor="comment">
          Write a comment
        </Label>
        <Textarea
          name="comment"
          id="comment"
          placeholder="Write a comment..."
          value={comment}
          onChange={handleChange}
        />
        <Button className="self-end" disabled={!comment}>
          Submit
        </Button>
      </form>
    </div>
  );
}
