import { redirect } from "next/navigation";
import { getAuthSession } from "../services/auth";
import { AppError } from "./formatter";
import { AuthSession } from "@/types";

export const getSessionOrRedirect = async (to: string = "/") => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    redirect(to);
  }

  return session as AuthSession;
};

export const getSessionOrThrow = async () => {
  const session = await getAuthSession();
  if (!session || !session.user) {
    throw AppError("No session found!", 401);
  }

  return session as AuthSession;
};
