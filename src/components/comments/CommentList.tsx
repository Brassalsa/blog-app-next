import { useSession } from "next-auth/react";
import Comment from "./Comment";

export default function CommentList({ comments }: { comments: CommentType[] }) {
  const { data } = useSession();
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          showMenu={data?.user?.email === comment.author.email}
        />
      ))}
    </div>
  );
}
