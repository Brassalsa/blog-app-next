import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/services/server/blog.controller";
import { MenuBtn, usePostMenuCtx } from ".";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const ActionDelete = () => {
  const { toast } = useToast();
  const { id } = usePostMenuCtx();
  const deleteBlogPost = async () => {
    toast({
      title: "Delete Post",
      description: "Post deletion in progress.",
    });

    const res = await deletePost(id);

    if (res.err) {
      toast({
        title: "Delete Post",
        description: res.err,
        className: "text-red-400",
      });
    } else {
      toast({
        title: "Delete Post",
        description: res.data,
      });
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <MenuBtn>Delete</MenuBtn>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            Are you sure you want to Delete this post?
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post from our server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteBlogPost}
              className="bg-red-500 text-white hover:bg-red-400 transition"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default ActionDelete;
