import { formatDate } from "@/lib/utils/helpers";
import AuthorUI from "../AuthorUI";
import { Card, CardContent, CardDescription } from "../ui/card";
import CommentMenu from "./CommentMenu";
import { CommentType } from "@/types";

export default function Comment({
  comment,
  showMenu = false,
}: {
  comment: CommentType;
  showMenu?: boolean;
}) {
  return (
    <Card className="my-3">
      <CardContent className="border flex flex-col gap-2 justify-center py-3 rounded-lg relative">
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2 flex-wrap items-center">
            <AuthorUI author={comment.author} />
            <p className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </p>
          </div>
          {showMenu && <CommentMenu comment={comment} />}
        </div>
        <CardDescription className="text-secondary-foreground">
          {comment.comment}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
