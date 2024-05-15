"use server";

import asyncHandler from "@/lib/utils/asyncHandler";
import db from "../db";
import { AppError, AppResponse } from "@/lib/utils/formatter";
import { getSessionOrThrow } from "@/lib/utils/authUtils";
import { revalidatePath } from "next/cache";
import { links } from "@/lib/routes";
import { getUserIdByEmailOrThrow } from "./helpers";

export const addComment = asyncHandler(
  async (postId: string, comment: string) => {
    const { user: authUser } = await getSessionOrThrow();
    const user = await getUserIdByEmailOrThrow(authUser?.email || "");

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
      },
    });
    if (!post) throw AppError("post not found", 404);

    await db.comment.create({
      data: {
        postId,
        comment,
        authorId: user.id,
      },
    });
    revalidatePath(links.blog(postId));
    return AppResponse("comment created successfully", 201);
  }
);

export const deleteComment = asyncHandler(
  async (commentId: string, postId: string) => {
    const { user: authUser } = await getSessionOrThrow();
    const user = await getUserIdByEmailOrThrow(authUser?.email || "");

    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
        authorId: user.id,
        postId,
      },
      select: {
        id: true,
      },
    });

    if (!comment) throw AppError("comment not found", 404);

    await db.comment.delete({
      where: {
        id: comment.id,
      },
    });
    revalidatePath(links.blog(postId));
    return AppResponse("comment deleted successfully", 201);
  }
);

export const editComment = asyncHandler(
  async (commentId: string, postId: string, payload: string) => {
    const { user: authUser } = await getSessionOrThrow();
    const user = await getUserIdByEmailOrThrow(authUser?.email || "");

    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
        authorId: user.id,
        postId,
      },
      select: {
        id: true,
      },
    });

    if (!comment) throw AppError("comment not found", 404);

    await db.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        comment: payload,
      },
    });

    revalidatePath(links.blog(postId));

    return AppResponse("comment updated successfully", 201);
  }
);
