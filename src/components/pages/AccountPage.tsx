"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  session: Session;
};

function AccountPage({ session }: Props) {
  return (
    <div>
      <div className="flex gap-2 justify-center items-center">
        <h1 className="mr-auto heading">Account</h1>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    </div>
  );
}

export default AccountPage;
