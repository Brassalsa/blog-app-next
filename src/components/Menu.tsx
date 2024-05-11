"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOutIcon, MenuIcon, PencilIcon } from "lucide-react";

import { Button } from "./ui/button";
import ButtonLink from "./ui/buttonLink";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLoading } from "./ui/buttonLoading";
import TooltipComponent from "./ui/tooltip";
import { links } from "@/lib/routes";
import { Skeleton } from "./ui/skeleton";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import AuthorUI from "./AuthorUI";

type Props = {
  className?: string;
};
export default function Menu({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MenuLinks className={cn("hidden sm:flex", className)} />
      <div className="ml-auto sm:hidden relative">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="w-80">
            <SheetClose asChild>
              <MenuLinks
                className="flex-col"
                isOnMenuSLider={true}
                onNavigate={() => setIsOpen(false)}
              />
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

type MenuLinksProps = {
  className?: string;
  isOnMenuSLider?: boolean;
  onNavigate?: () => void;
};
export function MenuLinks({
  className,
  isOnMenuSLider = false,
  onNavigate,
}: MenuLinksProps) {
  const router = useRouter();
  const { status, data } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <ul
      className={cn(
        "ml-auto gap-2 justify-center items-center flex relative h-full",
        {
          "flex-col gap-8 *:border-b *:w-full *:text-center pb-7 even:hover:bg-accent":
            isOnMenuSLider,
        },
        className
      )}
    >
      <li onClick={handleNavigate}>
        <ThemeToggle withText={isOnMenuSLider} className="border-none" />
      </li>
      <li onClick={handleNavigate}>
        <ButtonLink href={links.home}>Home</ButtonLink>
      </li>
      <li onClick={handleNavigate}>
        <ButtonLink href={links.blogs}>Blogs</ButtonLink>
      </li>
      <li onClick={handleNavigate}>
        <ButtonLink href={links.about}>About</ButtonLink>
      </li>

      {isLoading && (
        <li onClick={handleNavigate}>
          <Skeleton className="h-8 w-16 flex justify-center items-center">
            <ButtonLoading variant={"ghost"} />
          </Skeleton>
        </li>
      )}
      {!isLoggedIn && !isLoading && (
        <li onClick={handleNavigate}>
          <Button
            onClick={() => {
              router.push(links.signIn);
            }}
          >
            Signup
          </Button>
        </li>
      )}

      {isLoggedIn && (
        <>
          <li onClick={handleNavigate}>
            <ButtonLink href={links.addBlog}>
              <TooltipComponent showOnHover={() => <p>Add new Post</p>}>
                <span>
                  {isOnMenuSLider ? "Add Post" : <PencilIcon size={16} />}
                  <span className="sr-only">Add new post</span>
                </span>
              </TooltipComponent>
            </ButtonLink>
          </li>

          {!isOnMenuSLider && (
            <li onClick={handleNavigate} className="scale-[80%] translate-y-1">
              <ButtonLink href={links.account}>
                <TooltipComponent
                  showOnHover={() => (
                    <>
                      <p>Account Page</p>
                    </>
                  )}
                >
                  <AuthorUI author={data!.user!} withText={false} />
                </TooltipComponent>
              </ButtonLink>
            </li>
          )}

          {isOnMenuSLider && (
            <li
              onClick={handleNavigate}
              className="absolute bottom-0 flex gap-2 items-center"
            >
              <ButtonLink href={links.account}>
                <AuthorUI author={data!.user!} />
              </ButtonLink>
              <Button variant="outline" size="icon" onClick={() => signOut()}>
                <LogOutIcon className="text-red-400" />
                <span className="sr-only">Log out</span>
              </Button>
            </li>
          )}
        </>
      )}
    </ul>
  );
}
