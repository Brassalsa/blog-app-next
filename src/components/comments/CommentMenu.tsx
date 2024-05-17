"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { CommentType } from "@/types";

type MenuProps = {
  comment: CommentType;
};
export default function CommentMenu({ comment }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Comment menu</DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <EditComment comment={comment} />
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <DeleteComment comment={comment} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
