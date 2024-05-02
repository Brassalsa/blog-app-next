"use server";
import asyncHanlder from "@/lib/utils/asyncHandler";
import uploadFile from "../cdn/upload";
import { AppError } from "@/lib/utils/formatter";
import { imageSchema } from "@/lib/utils/validators/image";
import { UploadApiOptions } from "cloudinary";

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

    const res = await uploadFile(file, options);
    if (!res) throw new Error(res);
    return res.url as string;
  }
);
