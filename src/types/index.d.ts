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
  author: {
    image: string;
    name: string;
    email: string;
  };
};

type BlogPostCard = {
  id: string;
  title: string;
  category: string;
  about: string;
  image: string;
  createdAt: BlogPostType["createdAt"];
  updatedAt: BlogPostType["updatedAt"];
  author: BlogPostType["author"];
};
