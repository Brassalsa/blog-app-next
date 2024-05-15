import AuthorUI from "../AuthorUI";
import { Card, CardContent, CardDescription } from "../ui/card";
import CommentMenu from "./CommentMenu";

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
          <AuthorUI className="flex-1" author={comment.author} />
          {showMenu && <CommentMenu comment={comment} />}
        </div>
        <CardDescription className="text-secondary-foreground">
          {comment.comment}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
