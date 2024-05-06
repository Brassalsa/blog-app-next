import PostList from "@/components/PostList";
import { getPostList } from "@/lib/services/server/blog.controller";

async function BlogList() {
  const res = await getPostList();
  if (!res.data) {
    throw new Error("something went wrong");
  }

  return <PostList list={res.data} />;
}

export default BlogList;
