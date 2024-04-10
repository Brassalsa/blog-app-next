"use client";

import { ALL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import React from "react";

// all cat list
export default function Categories() {
  return Object.keys(ALL_CATEGORIES).map((i) => <CategCard key={i} text={i} />);
}

// cat list
type ListProps = React.ComponentPropsWithoutRef<"div"> & {
  list: ALL_CATEGORIES[];
};
export function CategList({ list, ...rest }: ListProps) {
  return (
    <div {...rest} className={cn("flex gap-2 flex-wrap", rest.className)}>
      {list.map((i) => (
        <CategCard key={i} text={i} />
      ))}
    </div>
  );
}

// cat component
type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  text: ALL_CATEGORIES | string;
};

export function CategCard({ text, ...rest }: CardProps) {
  if (!(text in ALL_CATEGORIES)) {
    console.warn("category not found! ", text);
    return;
  }

  return (
    <div
      {...rest}
      className={cn(
        "first-letter:uppercase text-sm px-2 py-1 border w-fit rounded-md text-muted-foreground",
        rest.className
      )}
    >
      {ALL_CATEGORIES[text as ALL_CATEGORIES]}
    </div>
  );
}
