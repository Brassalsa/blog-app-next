import LatestPost from "@/components/LatestPost";
import Hero from "@/components/Hero";
import {
  getLatestPost,
  getPostList,
} from "@/lib/services/server/blog.controller";
import PostList from "@/components/PostList";
import AllCategories from "@/components/Categories";

export default async function Home() {
  const [latestPostRes, postListRes] = await Promise.all([
    await getLatestPost(),
    await getPostList(),
  ]);

  return (
    <main>
      <Hero />
      <div className="flex gap-10">
        <LatestPost data={latestPostRes.data} err={latestPostRes.err} />
        <AllCategories />
      </div>
      <div className="space-y-3">
        <h2 className="heading">Blog Posts</h2>
        <PostList list={postListRes.data || []} />
      </div>
    </main>
  );
}
