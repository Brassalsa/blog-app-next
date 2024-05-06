import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
};
function Container({ children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn(
        "pb-10 container min-h-fit min-w-full break-words",
        rest.className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
