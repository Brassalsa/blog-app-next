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

function Header() {
  const router = useRouter();
  const { status, data } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";
  return (
    <div>
      <Container className="p-3">
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
              {isLoading ? (
                <ButtonLoading variant={"ghost"} />
              ) : isLoggedIn ? (
                <>
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
                          src={data.user?.image || ""}
                          alt="acount"
                          fill
                          sizes="30px"
                        />
                      </div>
                    </TooltipComponent>
                  </ButtonLink>
                </>
              ) : (
                <Button
                  onClick={() => {
                    router.push(links.signIn);
                  }}
                >
                  Signup
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default Header;
