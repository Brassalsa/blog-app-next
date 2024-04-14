import { redirect } from "next/navigation";
import { getAuthSession } from "../auth";

export const getSessionOrRedirect = async (to: string = "/") => {
  const session = await getAuthSession();

  if (session === null) {
    redirect(to);
  }

  return session;
};
