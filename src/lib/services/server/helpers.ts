import { AppError } from "@/lib/utils/formatter";
import db from "../db";

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
