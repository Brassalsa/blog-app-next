import { BlogPostCard } from "@/types";
import PostCard from "./PostCard";
import { BackgroundGradient } from "./ui/background-gradient";

type Props = {
  data: BlogPostCard;
};
function LatestPost({ data }: Props) {
  return (
    <div className="mb-6 w-min">
      <h2 className="heading mb-5">Latest</h2>
      <BackgroundGradient className="rounded-[22px] p-1  bg-background overflow-hidden">
        <PostCard {...data} className="border-none shadow-none" />
      </BackgroundGradient>
    </div>
  );
}

export default LatestPost;
