import BlogListPage from "@/components/pages/BlogListPage";
import { POST_PER_PAGE } from "@/lib/constants";

import { getPostList } from "@/lib/services/server/blog.controller";

type Props = {
  searchParams: {
    page: string | undefined;
  };
};

async function BlogList({ searchParams }: Props) {
  const { page } = searchParams;
  const currentPage = Number(page) || 1;
  const postPerPage = POST_PER_PAGE;

  const res = await getPostList(currentPage, postPerPage);
  if (!res.data) {
    throw new Error("something went wrong");
  }

  return (
    <>
      <BlogListPage
        title="Blog Posts"
        posts={res.data}
        disableNext={res.data.length === 0 || res.data.length < postPerPage}
        disablePrev={currentPage <= 1}
      />
    </>
  );
}

export default BlogList;
