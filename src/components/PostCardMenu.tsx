import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { PostCardProps } from "./PostCard";
import { links } from "@/lib/routes";
import Link from "next/link";
import React from "react";

export default function PostCardMenu({ id, author }: PostCardProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="absolute top-0 right-0">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <MenuItemLink href={links.blog(id)}>View</MenuItemLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <MenuItemLink href={links.accountId(author.id!)}>Author</MenuItemLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type MenuItemProps = {
  children: React.ReactNode;
  href: string;
};

const MenuItemLink = React.forwardRef<MenuItemProps, any>(
  ({ href, children }, ref) => {
    return (
      <Link
        className="w-full flex justify-center items-center px-1 py-2 rounded-md hover:bg-secondary transition duration-200"
        href={href}
      >
        {children}
      </Link>
    );
  }
);
