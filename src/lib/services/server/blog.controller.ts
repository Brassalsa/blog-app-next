"use server";

import asyncHandler from "@/lib/utils/asyncHandler";
import { AppError } from "@/lib/utils/formatter";
import db from "../db";
import { getSessionOrThrow } from "@/lib/utils/authUtils";
import { uploadImage } from "./utils";
import { POST_PER_PAGE } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { verifyBlogPostForm } from "./helpers";

// add a post
export const addBlogPost = asyncHandler(async (formData: FormData) => {
  const { user } = await getSessionOrThrow();
  const safeData = verifyBlogPostForm(formData);

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
          id: true,
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
          id: true,
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
            id: true,
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
            id: true,
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

// get account posts by id
export const getAccoutPosts = asyncHandler(
  async (
    accountId: string,
    page: number = 1,
    pageSize: number = POST_PER_PAGE
  ) => {
    const skip = (page - 1) * pageSize;
    const res = await db.post.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        authorId: accountId,
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
            id: true,
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

// delete a post
export const deletePost = asyncHandler(async (postId: string) => {
  const { user } = await getSessionOrThrow();
  const postIdInDb = await db.post.findUnique({
    where: {
      id: postId,
      author: {
        email: user.email,
      },
    },
    select: {
      id: true,
    },
  });

  if (!postIdInDb) {
    throw AppError("Post not found", 404);
  }

  await db.post.delete({
    where: {
      id: postIdInDb.id,
    },
  });

  revalidatePath("/");

  return "deleted successfully";
});

// edit post
export const editPost = asyncHandler(
  async (postId: string, formData: FormData) => {
    const safeData = verifyBlogPostForm(formData);
    const { user } = await getSessionOrThrow();
    const postIdInDb = await db.post.findUnique({
      where: {
        id: postId,
        author: {
          email: user.email,
        },
      },
      select: {
        id: true,
      },
    });

    if (!postIdInDb) {
      throw AppError("post not found", 404);
    }

    const img = formData.get("image") as File | string;
    let imgUrl = "";
    if (img instanceof File) {
      let res = await uploadImage(formData, "image");
      if (!res.data) {
        throw AppError(res.err!, res.statusCode);
      }
      imgUrl = res.data;
    } else {
      imgUrl = img;
    }
    await db.post.update({
      where: {
        id: postIdInDb.id,
      },
      data: {
        ...safeData,
        image: imgUrl,
      },
    });
    revalidatePath("/");
    return "updated successfully";
  }
);
