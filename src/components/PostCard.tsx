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
import { BlogPostCard, PropsDefault, PropsWithClassName } from "@/types";
import { Skeleton } from "./ui/skeleton";
import PostCardMenu from "./PostCardMenu";
import MultiplyNode from "./ui/multiply-node";

const PostCardContext = createContext<BlogPostCard | null>(null);
export const usePostCardContext = () => {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error("usePostCardContext must be used within PostCard");
  }
  return context;
};

export type PostCardProps = BlogPostCard & PropsDefault;

export default function PostCard(props: PostCardProps) {
  const { className, children } = props;

  return (
    <PostCardContext.Provider value={props}>
      <Card
        className={cn(
          "w-[85svw] md:w-80 lg:w-[420px] bg-transparent relative sm:grid grid-cols-2 md:grid-cols-1 items-center justify-center rounded-md  shadow-muted-foreground/30 border ",
          className
        )}
      >
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
  const { author } = usePostCardContext();
  return (
    <>
      <PostCard.Menu />
      <PostCard.Image />
      <PostCard.LinkComp>
        <PostCard.ContentUI>
          <PostCard.Category />
          <PostCard.Title />
          <PostCard.About />
          <AuthorUI author={author}>
            <AuthorUI.Image />
            <AuthorUI.RightUI>
              <AuthorUI.Name />
              <PostCard.Date />
            </AuthorUI.RightUI>
          </AuthorUI>
        </PostCard.ContentUI>
      </PostCard.LinkComp>
    </>
  );
};

PostCard.Image = function () {
  const { image } = usePostCardContext();
  return (
    <PostCard.LinkComp>
      <CardHeader className="p-0 md:pb-4 overflow-hidden">
        <div className="relative h-72 w-full lg:h-80 min-w-52 hidden sm:block mx-auto right-0">
          <Image
            src={image}
            className="object-cover"
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

PostCard.Menu = () => {
  const { id, author } = usePostCardContext();
  return (
    <PostCardMenu
      id={id}
      author={author}
      className="scale-75 absolute top-0 right-0 m-0  text-white border-primary border-2 shadow-black"
    />
  );
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

export function PostCardLoading({ children }: PropsWithChildren) {
  return (
    <Card
      className={
        "w-[85svw] md:w-80 lg:w-[420px] bg-transparent relative sm:grid grid-cols-2 md:grid-cols-1 items-center justify-center rounded-md  shadow-muted-foreground/30 border"
      }
    >
      {children || <DefaultLoading />}
    </Card>
  );
}

const DefaultLoading = () => (
  <>
    <PostCardLoading.Image />
    <PostCardLoading.Content>
      <MultiplyNode
        times={1}
        node={<Skeleton className="aspect-video h-9 w-24 mx-2" />}
      />
      <Skeleton className="w-full h-20" />
      <div className="flex gap-2">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-1">
          <MultiplyNode times={2} node={<Skeleton className="h-5 w-24" />} />
        </div>
      </div>
    </PostCardLoading.Content>
  </>
);

PostCardLoading.Image = ({ className, children }: PropsDefault) =>
  children || (
    <CardHeader className="p-0 md:pb-4 overflow-hidden">
      <div
        className={cn(
          "relative h-72 w-full lg:h-80 min-w-52 hidden sm:block mx-auto right-0",
          className
        )}
      >
        <Skeleton className="absolute inset-0" />
      </div>
    </CardHeader>
  );

PostCardLoading.Content = ({ className, children }: PropsDefault) => (
  <CardContent className={cn("truncate flex flex-col gap-2", className)}>
    {children}
  </CardContent>
);
