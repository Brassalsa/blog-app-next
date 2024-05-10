import AccountPage from "@/components/pages/AccountPage";
import { getSessionOrRedirect } from "@/lib/utils/authUtils";

async function page() {
  const session = await getSessionOrRedirect();
  return <AccountPage session={session} />;
}

export default page;
