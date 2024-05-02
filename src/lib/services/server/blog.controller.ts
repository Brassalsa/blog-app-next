"use server";

import asyncHandler from "@/lib/utils/asyncHandler";
import { AppError } from "@/lib/utils/formatter";
import blogSchema from "@/lib/utils/validators/blogPostValidator";
import db from "../db";
import { getSessionOrThrow } from "@/lib/utils/authUtils";
import { uploadImage } from "./utils";

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

// get featured post
export const getFeaturedPost = asyncHandler(async () => {
  const res = await db.post.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return res;
});
