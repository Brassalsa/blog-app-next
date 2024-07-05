"use server";

import asyncHandler from "@/lib/utils/asyncHandler";
import db from "../db";
import { getUserIdByEmailOrThrow } from "./helpers";

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
