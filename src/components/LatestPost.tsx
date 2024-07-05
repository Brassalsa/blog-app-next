"use client";

import { BlogPostCard } from "@/types";
import PostCard from "./PostCard";
import ErrorCard from "./ui/error-card";
import { BackgroundGradient } from "./ui/background-gradient";

type Props = {
  data: BlogPostCard | null;
  err: string | null;
};
function LatestPost({ data, err }: Props) {
  if (!data) {
    return (
      <ErrorCard>
        <ErrorCard.Title>Error while fetching latest post..</ErrorCard.Title>
        <ErrorCard.Description children={err} />
      </ErrorCard>
    );
  }

  return (
    <div className="mb-6 w-min">
      <h2 className="heading mb-5">Latest</h2>
      <BackgroundGradient className="rounded-[22px] p-1  bg-background">
        <PostCard {...data} className="border-none shadow-none" />
      </BackgroundGradient>
    </div>
  );
}

export default LatestPost;
