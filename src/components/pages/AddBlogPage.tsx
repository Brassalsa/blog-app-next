"use client";
import { addBlogPost } from "@/lib/services/server/blog.controller";
import BlogEditor from "../BlogEditor";
import { useRouter } from "next/navigation";
import { BlogEditorType } from "@/types";
import { links } from "@/lib/routes";

function AddBlogPage() {
  const router = useRouter();
  return (
    <BlogEditor
      submitAction={async (data: BlogEditorType) => {
        return addBlogPost(data);
      }}
      defaultValues={{
        title: "",
        about: "",
        category: "",
        description: "",
        image: "",
        imagePubId: "",
        descImgsIds: [],
      }}
      onSuccess={(res) => {
        router.push(links.blog(res!.data.id));
      }}
    />
  );
}

export default AddBlogPage;
