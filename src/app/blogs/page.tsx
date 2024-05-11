import PaginationComponent from "@/components/PaginationComponent";
import PostList from "@/components/PostList";
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
  const isEmptyList = res.data.length === 0;

  return (
    <div className="flex flex-col items gap-4 min-h-[80svh]">
      <div className="flex-1 flex flex-col">
        <h1 className="heading">Blog Posts</h1>
        {isEmptyList ? (
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-2xl heading">Nothing to show</h1>
          </div>
        ) : (
          <PostList list={res.data} />
        )}
      </div>
      <PaginationComponent
        disableNext={isEmptyList || res.data.length < postPerPage}
        disableBack={currentPage <= 1}
      />
    </div>
  );
}

export default BlogList;
