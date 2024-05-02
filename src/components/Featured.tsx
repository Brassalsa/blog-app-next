import { getFeaturedPost } from "@/lib/services/server/blog.controller";
import PostCard from "./PostCard";

async function Featured() {
  const res = await getFeaturedPost();
  if (!res.data) {
    return;
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Featured</h2>
      <PostCard {...res.data} />
    </div>
  );
}

export default Featured;
