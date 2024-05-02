import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { CategList } from "./Categories";
import { links } from "@/lib/routes";
import Image from "next/image";
import { formatDate } from "@/lib/utils/helpers";

type Props = {
  id: string;
  title: string;
  category: string;
  about: string;
  image: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  className?: string;
};

function PostCard({
  id,
  title,
  category,
  about,
  image,
  createdAt,
  updatedAt,
  className,
}: Props) {
  return (
    <Link
      href={links.blog(id)}
      className={cn(
        "border-4 p-3 max-w-full min-w-72 overflow-ellipsis flex gap-8 rounded-md items-center",
        className
      )}
    >
      <div className="relative flex-1 min-h-52 aspect-auto  overflow-hidden">
        <Image
          src={image}
          className="object-cover rounded-lg"
          alt="post-image"
          fill
        />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex gap-2">
          <CategList list={[category]} />
          <span className="ml-auto text-muted-foreground text-sm">
            {formatDate(updatedAt)}
          </span>
        </div>
        <div>{about.substring(0, 50)}...</div>
      </div>
    </Link>
  );
}

export default PostCard;
