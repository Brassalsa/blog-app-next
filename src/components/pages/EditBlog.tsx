"use client";
import { BlogEditorType, BlogPostType } from "@/types";
import BlogEditor from "../BlogEditor";
import { editPost } from "@/lib/services/server/blog.controller";
import { useRouter } from "next/navigation";
import { links } from "@/lib/routes";

type Props = {
  post: BlogPostType;
};

function EditBlogPage({ post }: Props) {
  const router = useRouter();
  return (
    <BlogEditor
      submitAction={async (data: BlogEditorType) => {
        return await editPost(post.id, data);
      }}
      defaultValues={{ ...post }}
      afterSubmit={() => {
        router.push(links.blog(post.id));
      }}
    />
  );
}

export default EditBlogPage;
