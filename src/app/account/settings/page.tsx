import SettingsPage from "@/components/pages/SettingsPage";
import { getAccountIdByEmail } from "@/lib/services/server/account.controller";
import { getSessionOrRedirect } from "@/lib/utils/authUtils";
import ErrorPage from "@/components/pages/ErrorPage";
import React from "react";

async function AccountSettings() {
  const { user } = await getSessionOrRedirect();
  const res = await getAccountIdByEmail(user.email!);

  if (res.err) {
    return <ErrorPage error={res.err} statusCode={res.statusCode} />;
  }

  return <SettingsPage user={{ id: res.data!.id!, ...user }} />;
}

export default AccountSettings;
