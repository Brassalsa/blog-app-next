import PostCard from "./PostCard";
import ErrorCard from "./ui/error-card";
import Link from "next/link";
import { links } from "@/lib/routes";

type Props = {
  data: BlogPostCard | null;
  err: string | null;
};
function LatestPost({ data, err }: Props) {
  if (!data) {
    return (
      <ErrorCard>
        <ErrorCard.Title>Error while fetching latest post..</ErrorCard.Title>
        <ErrorCard.Description children={err} />
      </ErrorCard>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-5">Latest</h2>
      <Link href={links.blog(data.id)}>
        <PostCard
          {...data}
          className=" hover:bg-muted-foreground/30 transition duration-300"
        />
      </Link>
    </div>
  );
}

export default LatestPost;
