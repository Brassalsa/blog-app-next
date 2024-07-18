import { AppError } from "@/lib/utils/formatter";
import db from "../db";
import blogSchema from "@/lib/utils/validators/blogPostValidator";
import { CDNHost } from "@/lib/constants";

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

  if (
    !(image instanceof File) &&
    typeof image === "string" &&
    !image.includes(CDNHost) &&
    typeof image !== "string"
  ) {
    throw AppError("Invalid Image File", 400);
  }

  const safeData = blogSchema.parse({
    title,
    category,
    about,
    image,
    description,
  });

  return safeData;
};
