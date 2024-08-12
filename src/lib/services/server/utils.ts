"use server";
import asyncHanlder from "@/lib/utils/asyncHandler";
import uploadFile, { deleteFile, deleteFilesByTag } from "../cdn/utils";
import { AppError } from "@/lib/utils/formatter";
import { imageSchema } from "@/lib/utils/validators/image";
import { UploadApiOptions } from "cloudinary";
import { getSessionOrThrow } from "@/lib/utils/authUtils";

export const uploadImage = asyncHanlder(
  async (
    formData: FormData,
    key: string = "image",
    options: UploadApiOptions = {
      tags: ["blog-assets"],
    }
  ) => {
    const file = formData.get(key) as File | unknown;

    if (!(file instanceof File)) {
      throw AppError("Invalid image file", 400);
    }

    imageSchema.parse(file);
    // add author email to tags
    const { user } = await getSessionOrThrow();
    options.tags.push(user.email);

    const res = await uploadFile(file, options);
    if (!res) throw new Error(res);
    return {
      url: res.url as string,
      pubId: res.public_id as string,
    };
  }
);

export const deleteImageById = asyncHanlder(async (pubId: string) => {
  const { user } = await getSessionOrThrow();
  const res = await deleteFile(pubId, user.email!);
  console.log(res);
  if (!res) {
    throw new Error(res);
  }
  return res;
});

export const deleteUserPostImages = asyncHanlder(async (email?: string) => {
  if (!email) {
    const { user } = await getSessionOrThrow();
    email = user.email!;
  }
  const res = await deleteFilesByTag(email);
  return res;
});
