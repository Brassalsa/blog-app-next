import type { Session } from "next-auth";
import type { PropsWithChildren } from "react";

type Cb = () => void;

type PropsWithClassName = {
  className?: string;
};

type PropsDefault = PropsWithChildren & PropsWithClassName;

type AppResponseType<T> = {
  data: T;
  err: string | null;
  statusCode: number;
  type: "ok" | "err";
};

type BlogEditorType = {
  title: string;
  category: string;
  about: string;
  image: string;
  description: string;
};

type BlogPostType = BlogEditorType & {
  id: string;
  authorId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  author: AuthorType;
};

type BlogPostCard = {
  id: string;
  title: string;
  category: string;
  about: string;
  image: string;
  createdAt: BlogPostType["createdAt"];
  updatedAt: BlogPostType["updatedAt"];
  author: AuthorType;
};

type AuthorType = {
  id?: string;
  image?: string | null;
  name?: string | null;
  email?: string | null;
};

type CommentType = {
  id: string;
  comment: string;
  postId: string;
  authorId: string;
  author: AuthorType;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type AuthSession = Session & {
  user: NonNullable<Session["user"]>;
};
