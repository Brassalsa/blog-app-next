import BlogListPage from "@/components/pages/BlogListPage";
import ErrorCard from "@/components/ui/error-card";
import { POST_PER_PAGE } from "@/lib/constants";
import { getAccoutPosts } from "@/lib/services/server/blog.controller";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
};
export default async function AccountPost({ params, searchParams }: Props) {
  const { id } = params;
  const { page } = searchParams;

  const currentPage = Number(page) || 1;
  const res = await getAccoutPosts(id, currentPage);

  if (!res.data) {
    return (
      <ErrorCard
        className="mx-auto pt-10"
        title={res.statusCode}
        description={res.err}
      />
    );
  }
  return (
    <>
      <h2 className="heading">Posts</h2>
      <BlogListPage
        title=""
        posts={res.data}
        disableNext={res.data.length === 0 || res.data.length < POST_PER_PAGE}
        disablePrev={currentPage <= 1}
      />
    </>
  );
}
