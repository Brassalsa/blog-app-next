import { UserCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import { AuthorType } from "@/types";
import Link from "next/link";
import { links } from "@/lib/routes";

type Props = {
  author: AuthorType;
  className?: string;
  withText?: boolean;
  isLink?: boolean;
};
const AuthorUI = React.forwardRef<any, Props>(
  ({ author, className, withText = true, isLink = false }: Props, ref) => {
    const Comp = isLink ? Link : "div";
    return (
      <Comp
        href={links.accountId(author.id!)}
        className={cn(
          "flex gap-2",
          {
            group: isLink,
          },
          className
        )}
        ref={ref}
      >
        {author.image ? (
          <Image
            src={author.image}
            alt="author-image"
            width={80}
            height={80}
            className="object-cover aspect-square size-12 rounded-[1000px]"
          />
        ) : (
          <UserCircle className="size-10" />
        )}
        {withText && (
          <div className="flex flex-col justify-center items-start gap-1 text-sm truncate ">
            <div
              className={cn("font-semibold truncate", {
                "group-hover:underline": isLink,
              })}
            >
              {author.name || "N/A"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {author.email || "N/A"}
            </div>
          </div>
        )}
      </Comp>
    );
  }
);

export default AuthorUI;
