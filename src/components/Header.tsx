"use client";
import React from "react";
import { Button } from "./ui/button";
import Container from "./ui/container";
import Logo from "./Logo";
import ButtonLink from "./ui/buttonLink";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "./context/Theme";
import { ThemeToggle } from "./ThemeToggle";

function Header() {
  const router = useRouter();

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
              <ButtonLink href="/">Home</ButtonLink>
            </li>
            <li>
              <ButtonLink href="/blogs">Blogs</ButtonLink>
            </li>
            <li></li>

            <li className="ml-auto">
              <Button
                onClick={() => {
                  router.push("/sign-in");
                }}
              >
                Signup
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default Header;
