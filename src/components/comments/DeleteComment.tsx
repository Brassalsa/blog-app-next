import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { deleteComment } from "@/lib/services/server/comment.controller";
import { Button } from "../ui/button";
import { CommentType } from "@/types";

export default function DeleteComment({ comment }: { comment: CommentType }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    toast({
      title: "Comment",
      description: "Comment deletion in progress",
    });
    const res = await deleteComment(comment.id, comment.postId);
    if (!res.data) {
      toast({
        title: "Comment",
        description: res.err,
        className: "text-red-400",
      });
    } else {
      toast({
        title: "Comment",
        description: res.data,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="w-full text-sm">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Delete</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete your comment ?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
