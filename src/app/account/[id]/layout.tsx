import AccountLayout from "@/components/layout/AccountLayout";
import { getAccountDetailsById } from "@/lib/services/server/account.controller";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};
async function Layout({ children, params }: Props) {
  const { id } = params;
  const res = await getAccountDetailsById(id);

  if (!res.data) {
    notFound();
  }

  return <AccountLayout user={res.data} children={children} />;
}

export default Layout;
