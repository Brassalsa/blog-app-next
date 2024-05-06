import Post from "@/components/Post";
import { getPostById } from "@/lib/services/server/blog.controller";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};
async function BlogPost({ params }: Props) {
  const { id } = params;
  const res = await getPostById(id);
  if (!res.data) {
    return notFound();
  }
  return <Post {...res.data} />;
}

export default BlogPost;
