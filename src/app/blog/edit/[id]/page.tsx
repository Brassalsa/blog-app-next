import EditBlogPage from "@/components/pages/EditBlog";
import { getPostById } from "@/lib/services/server/blog.controller";
import { getSessionOrRedirect } from "@/lib/utils/authUtils";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};

async function EditBlog({ params }: Props) {
  await getSessionOrRedirect();
  const { id } = params;
  const res = await getPostById(id);
  if (!res.data) {
    return notFound();
  }

  return <EditBlogPage post={res.data} />;
}

export default EditBlog;
