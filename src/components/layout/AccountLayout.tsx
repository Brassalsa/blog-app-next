"use client";
import { AuthorType } from "@/types";
import { Separator } from "../ui/separator";
import SignOut from "../SignOut";
import { useSession } from "next-auth/react";
import AuthorUI, { AuthorUILoading } from "../AuthorUI";

type Props = {
  user: AuthorType;
  children?: React.ReactNode;
};

function AccountLayout({ user, children }: Props) {
  const { data, status } = useSession();
  const isMyAccount = data?.user?.email === user.email;
  const isLoading = status === "loading";
  return (
    <div className="space-y-4 ">
      <div className="flex gap-2 justify-center items-center">
        <h1 className="mr-auto heading">Account</h1>
        {isMyAccount && <SignOut />}
      </div>
      {isLoading ? (
        <AuthorUILoading className="h-40">
          <AuthorUILoading.Image className="h-40" />
          <Separator orientation="vertical" />
          <AuthorUILoading.Skeltons className="h-6 w-40" />
        </AuthorUILoading>
      ) : (
        <AuthorUI author={data!.user!} className="h-40 ">
          <AuthorUI.Image
            className="size-32 sm:size-40"
            height={400}
            width={400}
          />
          <Separator orientation="vertical" />

          <AuthorUI.RightUI>
            <AuthorUI.Name className="text-xl sm:text-2xl" />
            <AuthorUI.Email className="text-sm sm:text-lg text-muted-foreground" />
          </AuthorUI.RightUI>
        </AuthorUI>
      )}
      <Separator />
      {children}
    </div>
  );
}

export default AccountLayout;
