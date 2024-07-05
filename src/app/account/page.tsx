import { links } from "@/lib/routes";
import { getAccountIdByEmail } from "@/lib/services/server/account.controller";
import { getSessionOrRedirect } from "@/lib/utils/authUtils";
import { notFound, redirect } from "next/navigation";

async function page() {
  const session = await getSessionOrRedirect();
  const res = await getAccountIdByEmail(session.user.email!);
  if (!res.data) {
    notFound();
  }

  redirect(links.account + "/" + res.data.id);
}

export default page;
