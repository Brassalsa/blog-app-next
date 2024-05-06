"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PencilIcon } from "lucide-react";

import { Button } from "./ui/button";
import Container from "./ui/container";
import Logo from "./Logo";
import ButtonLink from "./ui/buttonLink";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLoading } from "./ui/buttonLoading";
import TooltipComponent from "./ui/tooltip";
import { links } from "@/lib/routes";
import Show from "./ui/show";
import { Skeleton } from "./ui/skeleton";

function Header() {
  const router = useRouter();
  const { status, data } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";
  return (
    <Container className="p-3 sticky top-0 z-10 bg-inherit shadow-md shadow-secondary-foreground/15 mb-10">
      <nav className="flex gap-2 items-center">
        <Logo />
        <ul className="ml-auto flex gap-2 justify-center items-center">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <ButtonLink href={links.home}>Home</ButtonLink>
          </li>
          <li>
            <ButtonLink href={links.blogs}>Blogs</ButtonLink>
          </li>
          <li>
            <ButtonLink href={links.about}>About</ButtonLink>
          </li>

          <li className="ml-auto">
            <Show>
              <Show.When isTrue={isLoading}>
                <Skeleton className="h-8 w-16 flex justify-center items-center">
                  <ButtonLoading variant={"ghost"} />
                </Skeleton>
              </Show.When>

              <Show.When isTrue={isLoggedIn}>
                <ButtonLink href={links.addBlog}>
                  <TooltipComponent showOnHover={() => <p>Add new Post</p>}>
                    <span>
                      <PencilIcon size={17} className="-translate-y-1" />
                    </span>
                  </TooltipComponent>
                </ButtonLink>

                <ButtonLink href={links.account}>
                  <TooltipComponent
                    showOnHover={() => (
                      <>
                        <p>Account Page</p>
                      </>
                    )}
                  >
                    <div className="relative size-8 rounded-full overflow-hidden">
                      <Image
                        src={data?.user?.image || ""}
                        alt="acount"
                        fill
                        sizes="30px"
                      />
                    </div>
                  </TooltipComponent>
                </ButtonLink>
              </Show.When>

              <Show.Else>
                <Button
                  onClick={() => {
                    router.push(links.signIn);
                  }}
                >
                  Signup
                </Button>
              </Show.Else>
            </Show>
          </li>
        </ul>
      </nav>
    </Container>
  );
}

export default Header;
