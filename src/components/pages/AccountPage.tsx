"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import AuthorUI from "../AuthorUI";
import { AuthSession } from "@/types";

type Props = {
  session: AuthSession;
};

function AccountPage({ session }: Props) {
  const { user } = session;
  return (
    <div>
      <div className="flex gap-2 justify-center items-center">
        <h1 className="mr-auto heading">Account</h1>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      <AuthorUI author={user} />
    </div>
  );
}

export default AccountPage;
