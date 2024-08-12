"use server";

import asyncHandler from "@/lib/utils/asyncHandler";
import { AppError } from "@/lib/utils/formatter";
import db from "../db";
import { getSessionOrThrow } from "@/lib/utils/authUtils";
import { deleteImageById } from "./utils";
import { POST_PER_PAGE } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { blogSchemaServer } from "@/lib/utils/validators/blogPostValidator";
import { BlogEditorType } from "@/types";
import { redirect } from "next/navigation";

// add a post
export const addBlogPost = asyncHandler(async (data: BlogEditorType) => {
  const { user } = await getSessionOrThrow();
  console.log(data);
  const safeData = blogSchemaServer.parse(data);

  const res = await db.post.create({
    data: {
      ...safeData,
      author: {
        connect: {
          email: user!.email!,
        },
      },
    },
  });
  revalidatePath("/");
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
      imagePubId: true,
      descImgsIds: true,
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

  // after delete
  postIdInDb.descImgsIds.map((i) => {
    deleteImageById(i);
  });
  deleteImageById(postIdInDb.imagePubId);
  revalidatePath("/");

  return "deleted successfully";
});

// edit post
export const editPost = asyncHandler(
  async (postId: string, data: BlogEditorType) => {
    const safeData = blogSchemaServer.parse(data);
    const { user } = await getSessionOrThrow();
    const oldPost = await db.post.findUnique({
      where: {
        id: postId,
        author: {
          email: user.email,
        },
      },
      select: {
        id: true,
        imagePubId: true,
        descImgsIds: true,
      },
    });

    if (!oldPost) {
      throw AppError("post not found", 404);
    }

    const newDescImgIds = safeData.descImgsIds;

    // update
    await db.post.update({
      where: {
        id: oldPost.id,
        author: {
          email: user.email,
        },
      },
      data: {
        ...safeData,
      },
    });

    // after update
    const oldDescImgIds = oldPost.descImgsIds;
    // delete old post images
    if (oldPost.imagePubId !== safeData.imagePubId) {
      deleteImageById(oldPost.imagePubId);
    }
    const toBeDeleted = oldDescImgIds.filter((i) => !newDescImgIds.includes(i));

    toBeDeleted.map((i) => {
      deleteImageById(i);
    });

    // revalidate path
    revalidatePath("/");
    return "updated successfully";
  }
);
