import { PostListLoading } from "@/components/PostList";
import React from "react";

function AccountPostLoading() {
  return (
    <>
      <h2 className="heading">Posts</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
        <PostListLoading />
      </div>
    </>
  );
}

export default AccountPostLoading;
