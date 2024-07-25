import LatestPost from "@/components/LatestPost";
import Hero from "@/components/Hero";
import {
  getLatestPost,
  getPostList,
} from "@/lib/services/server/blog.controller";
import PostList, { PostListLoading } from "@/components/PostList";
import AllCategories from "@/components/Categories";
import StreamComp from "@/components/ui/stream-comp";
import ErrorCard from "@/components/ui/error-card";

export default async function Home() {
  return (
    <main>
      <Hero />
      <div className="flex gap-10">
        <StreamComp
          fallback={<PostListLoading />}
          AsyncComp={async () => {
            const res = await getLatestPost();
            if (!res.data) {
              return (
                <ErrorCard
                  title={"Error while fetching latest post..."}
                  description={res.err}
                />
              );
            }
            return <LatestPost data={res.data} />;
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
            if (!res.data) {
              return (
                <ErrorCard
                  title={"Error fetching blog posts..."}
                  description={res.err}
                />
              );
            }
            return <PostList list={res.data} />;
          }}
        />
      </div>
    </main>
  );
}
