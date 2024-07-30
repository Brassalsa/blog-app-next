"use client";

import { ALL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import { links } from "@/lib/routes";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

// all cat list
export default function AllCategories() {
  return (
    <Card className=" hidden md:block max-w-xl pl-6 w-full">
      <CardHeader className="heading p-0 mb-5">Categories</CardHeader>
      <CardContent className="flex flex-wrap justify-between items-center gap-y-10">
        {Object.keys(ALL_CATEGORIES).map((i) => (
          <Link href={links.blogCat(i)} key={i}>
            <HoverBorderGradient className="bg-background group">
              <CategCard
                className="border-none transition hover:bg-none shadow-none group-hover:text-primary"
                text={i}
              />
            </HoverBorderGradient>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

// cat list
type ListProps = React.ComponentPropsWithoutRef<"div"> & {
  list: string[];
  asLink?: boolean;
};
export function CategList({ list, asLink = false, ...rest }: ListProps) {
  return (
    <div {...rest} className={cn("flex gap-2 flex-wrap", rest.className)}>
      {list.map((i) =>
        asLink ? (
          <Link href={links.blogCat(i)} key={i}>
            <HoverBorderGradient className="bg-background group">
              <CategCard
                className="border-none transition hover:bg-none shadow-none group-hover:text-primary"
                text={i}
              />
            </HoverBorderGradient>
          </Link>
        ) : (
          <CategCard key={i} text={i} />
        )
      )}
    </div>
  );
}

// cat component
type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  text: ALL_CATEGORIES | string;
};

export function CategCard({ text, ...rest }: CardProps) {
  return (
    <Card
      {...rest}
      className={cn(
        "first-letter:uppercase text-sm px-2 py-1 border w-fit rounded-md text-muted-foreground",
        rest.className
      )}
    >
      {ALL_CATEGORIES[text as ALL_CATEGORIES]}
    </Card>
  );
}
