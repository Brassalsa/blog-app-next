"use client";
import { HoverEffect } from "./ui/card-hover-effect";
import PostCard, { PostCardLoading } from "./PostCard";
import { BlogPostCard } from "@/types";
import MultiplyNode from "./ui/multiply-node";
import { POST_PER_PAGE } from "@/lib/constants";

type Props = {
  list: BlogPostCard[];
  showMenu?: boolean;
};
export default function PostList({ list, showMenu }: Props) {
  const renderItem = ({ item }: { item: BlogPostCard }) => (
    <PostCard className="bg-background m-1" {...item} />
  );
  return <HoverEffect items={list} ListItem={renderItem} />;
}

export function PostListLoading() {
  return <MultiplyNode node={<PostCardLoading />} times={POST_PER_PAGE} />;
}
