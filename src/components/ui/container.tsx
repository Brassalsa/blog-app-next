import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
};
function Container({ children, ...rest }: Props) {
  return (
    <div {...rest} className={cn("max-w-7xl mx-auto px-2", rest.className)}>
      {children}
    </div>
  );
}

export default Container;
