"use client";
import { HoverEffect } from "./ui/card-hover-effect";
import PostCard from "./PostCard";
import { useCallback } from "react";
import { BlogPostCard } from "@/types";

type Props = {
  list: BlogPostCard[];
};
function PostList({ list }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: BlogPostCard }) => (
      <PostCard className="bg-background m-1" {...item} />
    ),
    []
  );
  return <HoverEffect items={list} ListItem={renderItem} />;
}

export default PostList;
