"use client";
import { HoverEffect } from "./ui/card-hover-effect";
import PostCard from "./PostCard";
import { useCallback } from "react";

type Props = {
  list: BlogPostCard[];
};
function PostList({ list }: Props) {
  const renderItem = useCallback(
    (item: BlogPostCard) => <PostCard {...item} />,
    []
  );
  return <HoverEffect items={list} listItem={renderItem} />;
}

export default PostList;
