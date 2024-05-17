import BlogListPage from "@/components/pages/BlogListPage";
import { POST_PER_PAGE } from "@/lib/constants";
import { getPostListByCategory } from "@/lib/services/server/blog.controller";
import React from "react";

type Props = {
  params: {
    cat: string;
  };
  searchParams: {
    page: string | undefined;
  };
};
async function Category({ params, searchParams }: Props) {
  const { cat } = params;
  const { page } = searchParams;
  const currentPage = Number(page) || 1;
  const postPerPage = POST_PER_PAGE;

  const res = await getPostListByCategory(cat, currentPage, postPerPage);
  if (!res.data) {
    throw new Error("something went wrong");
  }

  return (
    <BlogListPage
      title={"category list " + `"${cat}"`}
      posts={res.data}
      disableNext={res.data.length === 0 || res.data.length < postPerPage}
      disablePrev={currentPage <= 1}
    />
  );
}

export default Category;
