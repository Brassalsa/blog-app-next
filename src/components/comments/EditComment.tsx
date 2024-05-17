import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { editComment } from "@/lib/services/server/comment.controller";
import { CommentType } from "@/types";

export default function EditComment({ comment }: { comment: CommentType }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [newComment, setNewComment] = useState(comment.comment);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!newComment) return;
    const res = await editComment(comment.id, comment.postId, newComment);
    if (!res.data) {
      toast({
        title: "Comment",
        description: res.err,
      });
    } else {
      toast({
        title: "Comment",
        description: res.data,
      });
    }
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
          <DialogDescription>Make changes to your comment</DialogDescription>
        </DialogHeader>
        <div>
          <label className="sr-only" htmlFor="edit-comment">
            Edit comment
          </label>
          <Textarea
            id="edit-comment"
            name="edit-comment"
            value={newComment}
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={!newComment}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
