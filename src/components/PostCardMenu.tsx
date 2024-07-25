import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { links } from "@/lib/routes";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/services/server/blog.controller";
import { AuthorType, PropsWithClassName } from "@/types";
import { cn } from "@/lib/utils";

type PostMenuProps = PropsWithClassName & {
  id: string;
  author: AuthorType;
};
export default function PostCardMenu({ id, author, className }: PostMenuProps) {
  const { data } = useSession();
  const { toast } = useToast();
  const isAuthor = data?.user?.email === author.email;

  const deleteBlogPost = async () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("size-fit m-1 z-40", className)}>
          <Ellipsis size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <MenuItemLink href={links.blog(id)}>View</MenuItemLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <MenuItemLink href={links.accountId(author.id!)}>Author</MenuItemLink>
        </DropdownMenuItem>
        {isAuthor && (
          <>
            <DropdownMenuItem asChild>
              <MenuItemLink href={links.editBlog(id)}>Edit</MenuItemLink>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={deleteBlogPost}
              className="cursor-pointer text-center justify-center items-center"
            >
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type MenuItemProps = {
  children: React.ReactNode;
  href: string;
};

const MenuItemLink = ({ href, children }: MenuItemProps) => {
  return (
    <Link
      className="w-full flex justify-center items-center px-1 py-2 rounded-sm hover:bg-secondary transition duration-200 text-sm"
      href={href}
    >
      {children}
    </Link>
  );
};
