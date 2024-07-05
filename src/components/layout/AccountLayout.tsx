"use client";
import { AuthorType } from "@/types";
import Image from "next/image";
import { Separator } from "../ui/separator";
import SignOut from "../SignOut";
import { useSession } from "next-auth/react";

type Props = {
  user: AuthorType;
  children?: React.ReactNode;
};

function AccountLayout({ user, children }: Props) {
  const { data } = useSession();
  const isMyAccount = data?.user?.email === user.email;
  return (
    <div className="space-y-4 ">
      <div className="flex gap-2 justify-center items-center">
        <h1 className="mr-auto heading">Account</h1>
        {isMyAccount && <SignOut />}
      </div>
      <div className="flex gap-4 items-center h-40">
        <div className="relative flex-shrink-0 size-32 sm:size-40 rounded-full overflow-hidden">
          <Image src={user.image || ""} alt="user-img" sizes="400px" fill />
        </div>
        <Separator orientation="vertical" />
        <div className="overflow-hidden">
          <div className="from-left">
            <h2 className="text-xl sm:text-2xl">{user.name}</h2>
            <h3 className="text-sm sm:text-lg text-muted-foreground">
              {user.email}
            </h3>
          </div>
        </div>
      </div>
      <Separator />
      {children}
    </div>
  );
}

export default AccountLayout;
