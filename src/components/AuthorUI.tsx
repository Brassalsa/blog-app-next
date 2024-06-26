import { UserCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import { AuthorType } from "@/types";

type Props = {
  author: AuthorType;
  className?: string;
  withText?: boolean;
};
const AuthorUI = React.forwardRef<HTMLDivElement, Props>(
  ({ author, className, withText = true }: Props, ref) => {
    return (
      <div className={cn("flex gap-2", className)} ref={ref}>
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
          <div className="flex flex-col justify-center items-start gap-1 text-sm truncate">
            <div className="font-semibold truncate">{author.name || "N/A"}</div>
            <div className="text-xs text-muted-foreground truncate">
              {author.email || "N/A"}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default AuthorUI;
