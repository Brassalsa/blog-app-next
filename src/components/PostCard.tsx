import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { CategList } from "./Categories";
import { ALL_CATEGORIES } from "@/lib/constants";

type Props = {
  id: string;
  title: string;
  catg: ALL_CATEGORIES[];
  desc: string;
  date: Date;
  className?: string;
};

function PostCard({ id, title, catg, desc, date, className }: Props) {
  return (
    <Link
      href={"blog/" + id}
      className={cn(
        "border-4 p-3 max-w-full w-72 overflow-ellipsis flex flex-col gap-2 rounded-md",
        className
      )}
    >
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="flex gap-2">
        <CategList list={catg} />
        <span className="ml-auto text-muted-foreground text-sm">
          {date.toLocaleString().split(",")[0]}
        </span>
      </div>
      <div>{desc.substring(0, 50)}...</div>
    </Link>
  );
}

export default PostCard;
