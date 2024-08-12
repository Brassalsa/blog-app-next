"use client";

import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { deleteAccount } from "@/lib/services/server/account.controller";
import { useToast } from "@/hooks/use-toast";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function DeleteAccount() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialgoOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const { toast } = useToast();
  const handleDelete = async () => {
    const res = await deleteAccount(emailRef.current?.value || "");
    if (res.err) {
      toast({
        title: "Account Delete",
        description: res.err,
        className: "text-red-400 capitalize",
      });
    } else {
      toast({
        title: "Account Delete",
        description: res.err,
      });
    }
    setAlertOpen(false);
    setDialgoOpen(false);
  };
  return (
    <>
      <Dialog open={dialogOpen}>
        <DialogTrigger
          onClick={() => {
            setDialgoOpen(true);
          }}
        >
          Delete Account
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email</DialogTitle>
            <DialogDescription>
              Enter your email to delete account
            </DialogDescription>
          </DialogHeader>
          <Input id="email" ref={emailRef} type="email" />
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={() => setDialgoOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAlertOpen(true)}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={alertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers. It includes all the
              posts and comments you wrote.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setAlertOpen(false);
                setDialgoOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-400"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteAccount;
