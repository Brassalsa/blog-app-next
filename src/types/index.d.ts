type AppResponseType<T> = {
  data: T;
  err: string | null;
  statusCode: number;
  type: "ok" | "err";
};

type BlogPostType = {
  id: string;
  title: string;
  category: string;
  about: string;
  image: string;
  description: string;
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
