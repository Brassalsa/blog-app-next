import { redirect } from "next/navigation";
import { getAuthSession } from "../services/auth";
import { AppError } from "./formatter";
import { Session } from "next-auth";

export const getSessionOrRedirect = async (to: string = "/") => {
  const session = await getAuthSession();

  if (session === null) {
    redirect(to);
  }

  return session;
};

export const getSessionOrThrow = async () => {
  const session = await getAuthSession();
  if (!session) {
    throw AppError("No session found!", 401);
  }

  return session as NonNullable<Session>;
};
