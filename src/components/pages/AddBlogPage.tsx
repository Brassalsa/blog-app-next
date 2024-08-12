"use client";
import { addBlogPost } from "@/lib/services/server/blog.controller";
import BlogEditor from "../BlogEditor";
import { useRouter } from "next/navigation";
import { links } from "@/lib/routes";
import { BlogEditorType } from "@/types";

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
      afterSubmit={() => {
        router.push(links.home);
      }}
    />
  );
}

export default AddBlogPage;
