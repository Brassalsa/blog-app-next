"use client";

import { cn } from "@/lib/utils";
import React, { createContext, PropsWithChildren, useContext } from "react";
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
import { BlogPostCard } from "@/types";
import { Skeleton } from "./ui/skeleton";
import PostCardMenu from "./PostCardMenu";

const PostCardContext = createContext<BlogPostCard | null>(null);
export const usePostCardContext = () => {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error("usePostCardContext must be used within PostCard");
  }
  return context;
};

export type PostCardProps = BlogPostCard &
  PropsWithChildren & {
    className?: string;
  };

export default function PostCard(props: PostCardProps) {
  const { className, children } = props;

  return (
    <PostCardContext.Provider value={props}>
      <Card
        className={cn(
          "w-[85svw] md:w-80 lg:w-[420px] bg-transparent relative sm:grid grid-cols-2 md:grid-cols-1 items-center justify-center rounded-md  shadow-muted-foreground/30 border",
          className
        )}
      >
        <PostCardMenu {...props} />
        {children || <DefaultPost />}
      </Card>
    </PostCardContext.Provider>
  );
}

PostCard.LinkComp = ({
  children,
  className,
}: PropsWithChildren & {
  className?: string;
}) => {
  const { id } = usePostCardContext();
  return (
    <Link href={links.blog(id)} className={className}>
      {children}
    </Link>
  );
};

const DefaultPost = () => {
  return (
    <>
      <PostCard.Image />
      <PostCard.LinkComp>
        <PostCard.ContentUI>
          <PostCard.Author />
          <PostCard.Title />
          <PostCard.SubContentUI>
            <PostCard.Category />
            <PostCard.Date />
          </PostCard.SubContentUI>
          <PostCard.About />
        </PostCard.ContentUI>
      </PostCard.LinkComp>
    </>
  );
};

PostCard.Image = function () {
  const { image } = usePostCardContext();
  return (
    <PostCard.LinkComp>
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
    </PostCard.LinkComp>
  );
};

PostCard.Title = function () {
  const { title } = usePostCardContext();
  return <CardTitle className="truncate text-xl">{title}</CardTitle>;
};

PostCard.ContentUI = ({ children }: PropsWithChildren) => (
  <CardContent className="truncate flex flex-col gap-2">{children}</CardContent>
);
PostCard.SubContentUI = ({ children }: PropsWithChildren) => (
  <div className="flex gap-2 items-center">{children}</div>
);

PostCard.Author = () => {
  const { author } = usePostCardContext();
  return <AuthorUI author={author} />;
};

PostCard.Category = () => {
  const { category } = usePostCardContext();
  return <CategList list={[category]} />;
};

PostCard.Date = () => {
  const { createdAt } = usePostCardContext();
  return (
    <span className="text-muted-foreground text-sm">
      {formatDate(createdAt)}
    </span>
  );
};

PostCard.About = () => {
  const { about } = usePostCardContext();
  return <CardDescription className="truncate">{about}</CardDescription>;
};

export function PostCardLoading() {
  return (
    <Card
      className={
        "w-[85svw] md:w-80 lg:w-[420px] bg-transparent relative sm:grid grid-cols-2 md:grid-cols-1 items-center justify-center rounded-md  shadow-muted-foreground/30 border"
      }
    >
      <CardHeader>
        <div className="relative md:size-72 lg:size-80 min-w-52 aspect-square w-full hidden sm:block mx-auto">
          <Skeleton className="absolute inset-0" />
        </div>
      </CardHeader>

      <CardContent className="truncate flex flex-col gap-2">
        <CardTitle className="truncate text-xl">
          <Skeleton className="w-full h-10" />
        </CardTitle>
        <div className="flex gap-2">
          <Skeleton className="object-cover aspect-square size-12 rounded-[1000px]" />
          <div className="flex flex-col justify-center gap-1 text-sm">
            <Skeleton className="w-32 h-4 rounded-lg" />
            <Skeleton className="w-32 h-4 rounded-lg" />
          </div>
        </div>

        <CardDescription className="truncate">
          <Skeleton className="w-full h-9" />
        </CardDescription>
      </CardContent>
    </Card>
  );
}
