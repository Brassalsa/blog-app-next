import LatestPost from "@/components/LatestPost";
import Hero from "@/components/Hero";
import {
  getLatestPost,
  getPostList,
} from "@/lib/services/server/blog.controller";
import PostList, { PostListLoading } from "@/components/PostList";
import AllCategories from "@/components/Categories";
import StreamComp from "@/components/ui/stream-comp";

export default async function Home() {
  return (
    <main>
      <Hero />
      <div className="flex gap-10">
        <StreamComp
          fallback={<PostListLoading />}
          AsyncComp={async () => {
            const res = await getLatestPost();
            return <LatestPost data={res.data} err={res.err} />;
          }}
        />
        <AllCategories />
      </div>
      <div className="space-y-3">
        <h2 className="heading">Blog Posts</h2>
        <StreamComp
          fallback={<PostListLoading />}
          AsyncComp={async () => {
            const res = await getPostList();
            return <PostList list={res.data || []} />;
          }}
        />
      </div>
    </main>
  );
}
