import WriteComment from "./WriteComment";
import GetCommentsList from "./GetCommentList";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import CommentLoader from "./CommentLoader";

type Props = {
  postId: string;
  className?: string;
};

export default function Comments({ className, postId }: Props) {
  return (
    <div className={cn("mt-10 w-full space-y-4", className)}>
      <h2 className="heading">Comments</h2>
      <WriteComment postId={postId} />
      <Suspense fallback={<CommentLoader />}>
        <GetCommentsList postId={postId} />
      </Suspense>
    </div>
  );
}
