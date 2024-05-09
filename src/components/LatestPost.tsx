import PostCard from "./PostCard";
import ErrorCard from "./ui/error-card";

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
      <PostCard
        {...data}
        className=" hover:bg-muted-foreground/30 transition duration-300"
      />
    </div>
  );
}

export default LatestPost;
