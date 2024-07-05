import React from "react";

import { PostListLoading } from "@/components/PostList";
import BlogListPage from "@/components/pages/BlogListPage";
import { POST_PER_PAGE } from "@/lib/constants";
import { getAccoutPosts } from "@/lib/services/server/blog.controller";
import StreamComp from "@/components/ui/stream-comp";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
};
export default function AccountPost({ params, searchParams }: Props) {
  const { id } = params;
  const { page } = searchParams;

  const currentPage = Number(page) || 1;
  const postPerPage = 1 || POST_PER_PAGE;

  return (
    <>
      <h2 className="heading">Posts</h2>
      <StreamComp
        fallback={
          <div className="grid gap-y-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
            <PostListLoading />
          </div>
        }
        AsyncComp={async () => {
          const res = await getAccoutPosts(id, currentPage, postPerPage);
          if (!res.data) {
            return <p>Bruh...</p>;
          }

          return (
            <BlogListPage
              title=""
              posts={res.data}
              disableNext={
                res.data.length === 0 || res.data.length < postPerPage
              }
              disablePrev={currentPage <= 1}
            />
          );
        }}
      />
    </>
  );
}
