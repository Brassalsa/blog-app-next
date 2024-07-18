"use client";
import { addBlogPost } from "@/lib/services/server/blog.controller";
import BlogEditor from "../BlogEditor";

function AddBlogPage() {
  return (
    <BlogEditor
      submitAction={addBlogPost}
      defaultValues={{
        title: "",
        about: "",
        category: "",
        description: "",
        image: "",
      }}
    />
  );
}

export default AddBlogPage;
