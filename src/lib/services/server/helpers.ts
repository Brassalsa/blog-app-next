import { AppError } from "@/lib/utils/formatter";
import db from "../db";
import blogSchemaClient from "@/lib/utils/validators/blogPostValidator";
import { ALL_CATEGORIES, CDNHost } from "@/lib/constants";
import { z } from "zod";

import { BlogEditorType } from "@/types";

export const getUserIdByEmailOrThrow = async (email: string) => {
  if (email == "") throw AppError("user not found", 404);
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  if (!user) throw AppError("user not found", 404);

  return user;
};

export const verifyBlogPostForm = (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const category = formData.get("category")?.toString();
  const about = formData.get("about")?.toString();
  const image = formData.get("image") as File | unknown;
  const description = formData.get("description")?.toString();
  const descImgsIds = formData.get("descImgsIds")?.toString();

  if (
    !(image instanceof File) &&
    typeof image === "string" &&
    !image.includes(CDNHost) &&
    typeof image !== "string"
  ) {
    throw AppError("Invalid Image File", 400);
  }

  const safeData = blogSchemaClient.parse({
    title,
    category,
    about,
    image,
    description,
    descImgsIds,
  });

  return safeData;
};

export const verifyBlogPostData = z.object({
  title: z.string(),
  category: z.string().refine((val) => {
    return Object.keys(ALL_CATEGORIES).includes(val.toLowerCase());
  }),
  about: z.string().min(10),
  image: z.string().min(20, { message: "invalid image" }),
  descImgsIds: z.array(z.string()).min(1),
  description: z.string(),
});
