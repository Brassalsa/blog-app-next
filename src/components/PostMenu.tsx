"use client";
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
import React, { createContext, PropsWithChildren, useContext } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/services/server/blog.controller";
import { AuthorType, Cb, PropsDefault, PropsWithClassName } from "@/types";
import { cn } from "@/lib/utils";

type PostMenuCtxT = {
  id: string;
  author: AuthorType;
};
const PostMenuCtx = createContext<PostMenuCtxT | null>(null);

const usePostMenuCtx = () => {
  const ctx = useContext(PostMenuCtx);
  if (!ctx)
    throw new Error("usePostMenuCtx must be used inside PostMenu", {
      cause: "component used outside PostMenu",
    });
  return ctx;
};

type PostMenuProps = PropsWithClassName &
  PostMenuCtxT & {
    menuItems?: React.ReactNode;
  };

export default function PostMenu({
  id,
  author,
  className,
  menuItems,
}: PostMenuProps) {
  return (
    <PostMenuCtx.Provider value={{ id, author }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn("size-fit m-1 z-40", className)}
          >
            <Ellipsis size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuItems || <DefaultMenu />}
        </DropdownMenuContent>
      </DropdownMenu>
    </PostMenuCtx.Provider>
  );
}

const DefaultMenu = () => (
  <>
    <ViewPost />
    <ViewAuthor />
    <ShowWhenIsOwner>
      <ActionEdit />
      <ActionDelete />
    </ShowWhenIsOwner>
  </>
);

export const ViewPost = () => {
  const { id } = usePostMenuCtx();
  return <MenuLink href={links.blog(id)}>View</MenuLink>;
};

export const ViewAuthor = () => {
  const { author } = usePostMenuCtx();
  return <MenuLink href={links.accountId(author.id!)}>Author</MenuLink>;
};

export const ActionEdit = () => {
  const { id } = usePostMenuCtx();
  return <MenuLink href={links.editBlog(id)}>Edit</MenuLink>;
};

export const ActionDelete = () => {
  const { toast } = useToast();
  const { id } = usePostMenuCtx();

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
    <MenuBtn
      onClick={deleteBlogPost}
      className="cursor-pointer text-center justify-center items-center"
    >
      Delete
    </MenuBtn>
  );
};

export const ShowWhenIsOwner = ({ children }: PropsWithChildren) => {
  const { data } = useSession();
  const { author } = usePostMenuCtx();

  if (!(data?.user?.email === author.email)) {
    return null;
  }

  return <>{children}</>;
};

type MenuItemProps = PropsWithChildren & {
  href: string;
};
export const MenuLink = ({ href, children }: MenuItemProps) => {
  return (
    <DropdownMenuItem asChild>
      <Link
        className="w-full flex justify-center items-center px-1 py-2 rounded-sm hover:bg-secondary transition duration-200 text-sm cursor-pointer"
        href={href}
      >
        {children}
      </Link>
    </DropdownMenuItem>
  );
};

export const MenuBtn = ({
  children,
  className,
  onClick,
}: PropsDefault & { onClick?: Cb }) => {
  return (
    <DropdownMenuItem onClick={() => onClick?.()} className={className}>
      {children}
    </DropdownMenuItem>
  );
};
