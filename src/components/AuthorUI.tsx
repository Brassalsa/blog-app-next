"use client";

import { UserCircle } from "lucide-react";
import Image from "next/image";
import React, { useContext, createContext } from "react";

import { cn } from "@/lib/utils";
import { AuthorType, PropsDefault, PropsWithClassName } from "@/types";
import Link from "next/link";
import { links } from "@/lib/routes";

type Props = PropsDefault & {
  author: AuthorType;
  isLink?: boolean;
};

const AuthorContext = createContext<Props | null>(null);

export const useAuthorContext = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error("useAuthorContext must be used inside AuthorUI");
  }
  return context;
};

const AuthorUI = (props: Props) => {
  const { author, className, isLink = false, children } = props;
  const Comp = isLink ? Link : "div";
  return (
    <AuthorContext.Provider value={props}>
      <Comp
        href={links.accountId(author.id!)}
        className={cn(
          "flex gap-2 max-w-fit",
          {
            group: isLink,
          },
          className
        )}
      >
        {children || <DefaultAuthorUI />}
      </Comp>
    </AuthorContext.Provider>
  );
};

const DefaultAuthorUI = () => {
  return (
    <>
      <AuthorUI.Image />

      <AuthorUI.RightUI>
        <AuthorUI.Name />
        <AuthorUI.Email />
      </AuthorUI.RightUI>
    </>
  );
};

AuthorUI.Image = ({ className }: PropsWithClassName) => {
  const { author } = useAuthorContext();
  return author.image ? (
    <Image
      src={author.image}
      alt="author-image"
      width={80}
      height={80}
      className={cn(
        "object-cover aspect-square size-12 rounded-[1000px]",
        className
      )}
    />
  ) : (
    <UserCircle className="size-10" />
  );
};

AuthorUI.RightUI = ({ children, className }: PropsDefault) => (
  <div
    className={cn(
      "flex flex-col justify-center items-start gap-1 text-sm truncate",
      className
    )}
  >
    {children}
  </div>
);

AuthorUI.Name = ({ className }: PropsWithClassName) => {
  const { author, isLink } = useAuthorContext();
  return (
    <div
      className={cn(
        "font-semibold truncate text-xs",
        {
          "group-hover:underline": isLink,
        },
        className
      )}
    >
      {author.name || "N/A"}
    </div>
  );
};

AuthorUI.Email = ({ className }: PropsWithClassName) => {
  const { author } = useAuthorContext();
  return (
    <div className={cn("text-xs text-muted-foreground truncate", className)}>
      {author.email || "N/A"}
    </div>
  );
};

export default AuthorUI;
