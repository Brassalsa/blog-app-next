import CommentList from "./CommentList";
import { getCommentsByPostId } from "@/lib/services/server/comment.controller";
import ErrorCard from "../ui/error-card";

type Props = {
  postId: string;
};

export default async function GetCommentsList({ postId }: Props) {
  const res = await getCommentsByPostId(postId);
  return (
    <>
      {res.data && <CommentList comments={res.data} />}
      {res.err && (
        <ErrorCard
          title={"Error while fetching comments"}
          description={res.err}
        />
      )}
    </>
  );
}
