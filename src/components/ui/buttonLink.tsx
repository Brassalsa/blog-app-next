import Link from "next/link";
import React from "react";
import { Button } from "./button";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  children: React.ReactNode;
};

function ButtonLink({ children, href, ...rest }: Props) {
  return (
    <Link {...rest} href={href}>
      <Button variant="link">{children}</Button>
    </Link>
  );
}

export default ButtonLink;
