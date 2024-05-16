"use server";

import asyncHandler from "@/lib/utils/asyncHandler";
import { AppError } from "@/lib/utils/formatter";
import blogSchema from "@/lib/utils/validators/blogPostValidator";
import db from "../db";
import { getSessionOrThrow } from "@/lib/utils/authUtils";
import { uploadImage } from "./utils";
import { POST_PER_PAGE } from "@/lib/constants";

// add a post
export const addBlogPost = asyncHandler(async (formData: FormData) => {
  const { user } = await getSessionOrThrow();

  const title = formData.get("title")?.toString();
  const category = formData.get("category")?.toString();
  const about = formData.get("about")?.toString();
  const image = formData.get("image") as File | unknown;
  const description = formData.get("description")?.toString();

  if (!(image instanceof File)) {
    throw AppError("Invalid Image File", 400);
  }

  const safeData = blogSchema.parse({
    title,
    category,
    about,
    image,
    description,
  });

  const imageUrl = await uploadImage(formData, "image");
  if (!imageUrl.data) {
    throw AppError(imageUrl.err!, imageUrl.statusCode);
  }

  const res = await db.post.create({
    data: {
      ...safeData,
      image: imageUrl.data,
      author: {
        connect: {
          email: user!.email!,
        },
      },
    },
  });

  return res;
});

// get post by id
export const getPostById = asyncHandler(async (id: string) => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          image: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    throw AppError("Post Not Found", 404);
  }

  return post;
});

// get latest post
export const getLatestPost = asyncHandler(async () => {
  const res = await db.post.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      about: true,
      image: true,
      category: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          image: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return res;
});

// get post list
export const getPostList = asyncHandler(
  async (page: number = 1, pageSize: number = POST_PER_PAGE) => {
    const skip = (page - 1) * pageSize;
    const res = await db.post.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        about: true,
        image: true,
        category: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            image: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res;
  }
);

// get post by category
export const getPostListByCategory = asyncHandler(
  async (cat: string, page: number = 1, pageSize: number = POST_PER_PAGE) => {
    const skip = (page - 1) * pageSize;
    const res = await db.post.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        category: cat,
      },
      select: {
        id: true,
        about: true,
        image: true,
        category: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            image: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res;
  }
);
