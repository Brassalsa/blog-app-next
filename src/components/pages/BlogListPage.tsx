import { BlogPostCard } from "@/types";
import React from "react";
import PaginationComponent from "../PaginationComponent";
import PostList, { PostListLoading } from "../PostList";

type Props = {
  title: string;
  posts: BlogPostCard[];
  disableNext: boolean;
  disablePrev: boolean;
};
export default function BlogListPage({
  title,
  posts,
  disableNext,
  disablePrev,
}: Props) {
  return (
    <div className="flex flex-col items gap-4 min-h-[80svh]">
      <div className="flex-1 flex flex-col">
        <h1 className="heading capitalize">{title}</h1>
        {posts.length === 0 ? (
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-2xl heading">Nothing to show</h1>
          </div>
        ) : (
          <PostList list={posts} />
        )}
      </div>
      <PaginationComponent
        disableNext={disableNext}
        disableBack={disablePrev}
      />
    </div>
  );
}

type LoadingProps = {
  title?: string;
};
export function BlogListLoading({ title = "Blog Posts" }: LoadingProps) {
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="heading capitalize">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3">
        <PostListLoading />
      </div>
    </div>
  );
}
