import { cn } from "@/lib/utils";
import React from "react";
import { CategList } from "./Categories";
import Image from "next/image";
import { formatDate } from "@/lib/utils/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { links } from "@/lib/routes";
import AuthorUI from "./AuthorUI";

export type PostCardProps = BlogPostCard & {
  className?: string;
};

function PostCard({
  id,
  title,
  category,
  author,
  about,
  image,
  createdAt,
  className,
}: PostCardProps) {
  return (
    <Link href={links.blog(id)}>
      <Card
        className={cn(
          "w-[85svw] md:w-80 lg:w-[420px] bg-transparent relative sm:grid grid-cols-2 md:grid-cols-1 items-center justify-center rounded-md  shadow-muted-foreground/30 border",
          className
        )}
      >
        <CardHeader>
          <div className="relative md:size-72 lg:size-80 min-w-52 aspect-square w-full hidden sm:block mx-auto">
            <Image
              src={image}
              className="object-cover rounded-lg"
              sizes="500px"
              alt="post-image"
              fill
            />
          </div>
        </CardHeader>

        <CardContent className="truncate flex flex-col gap-2">
          <CardTitle className="truncate text-xl">{title}</CardTitle>
          <AuthorUI author={author} />
          <div className="flex gap-2 items-center">
            <CategList list={[category]} />
            <span className="text-muted-foreground text-sm">
              {formatDate(createdAt)}
            </span>
          </div>
          <CardDescription className="truncate">{about}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PostCard;
