import { BlogPostCard } from "@/types";
import React from "react";
import PaginationComponent from "../PaginationComponent";
import PostList from "../PostList";

type Props = {
  title: string;
  posts: BlogPostCard[];
  disableNext: boolean;
  disablePrev: boolean;
  showMenu?: boolean;
};
function BlogListPage({
  title,
  posts,
  disableNext,
  disablePrev,
  showMenu,
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
          <PostList list={posts} showMenu={showMenu} />
        )}
      </div>
      <PaginationComponent
        disableNext={disableNext}
        disableBack={disablePrev}
      />
    </div>
  );
}

export default BlogListPage;
