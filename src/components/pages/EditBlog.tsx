"use client";
import { BlogPostType } from "@/types";
import BlogEditor from "../BlogEditor";
import { editPost } from "@/lib/services/server/blog.controller";

type Props = {
  post: BlogPostType;
};

function EditBlogPage({ post }: Props) {
  return (
    <BlogEditor
      submitAction={async (formData: FormData) => {
        return await editPost(post.id, formData);
      }}
      defaultValues={{ ...post }}
    />
  );
}

export default EditBlogPage;
