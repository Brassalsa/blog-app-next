import LatestPost from "@/components/LatestPost";
import Hero from "@/components/Hero";
import {
  getLatestPost,
  getPostList,
} from "@/lib/services/server/blog.controller";
import PostList from "@/components/PostList";

export default async function Home() {
  const [latestPostRes, postListRes] = await Promise.all([
    await getLatestPost(),
    await getPostList(),
  ]);

  return (
    <main>
      <Hero />
      <LatestPost data={latestPostRes.data} err={latestPostRes.err} />
      <PostList list={postListRes.data || []} />
    </main>
  );
}
