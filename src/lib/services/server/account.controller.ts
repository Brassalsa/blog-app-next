"use server";

import asyncHandler from "@/lib/utils/asyncHandler";
import db from "../db";
import { getUserIdByEmailOrThrow } from "./helpers";
import { revalidatePath } from "next/cache";
import { getSessionOrThrow } from "@/lib/utils/authUtils";
import { AppError } from "@/lib/utils/formatter";
import { deleteUserPostImages } from "./utils";

export const getAccountIdByEmail = asyncHandler(async (email: string) => {
  return await getUserIdByEmailOrThrow(email);
});

export const getAccountDetailsById = asyncHandler(async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      image: true,
      name: true,
      email: true,
    },
  });

  return user;
});

export const deleteAccount = asyncHandler(async (email: string) => {
  const { user } = await getSessionOrThrow();
  if (user.email !== email) {
    throw AppError("email don't match", 400);
  }
  const del = await db.user.delete({
    where: {
      email,
    },
  });
  deleteUserPostImages(user.email);
  revalidatePath("/");
  return del;
});
