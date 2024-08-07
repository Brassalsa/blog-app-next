"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ClassNameValue } from "tailwind-merge";

type HoverEffectProps<T> = {
  items: T[];
  className?: string;
  listItemClassName?: ClassNameValue;
  ListItem: React.FC<{ item: T }>;
};

export function HoverEffect<T>({
  items,
  className,
  ListItem,
  listItemClassName,
}: HoverEffectProps<T>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 ",
        className
      )}
    >
      {items.map((item, idx) => (
        <HoverComponent
          key={idx}
          isActive={hoveredIndex == idx}
          onEnter={() => {
            setHoveredIndex(idx);
          }}
          onLeave={() => {
            setHoveredIndex(null);
          }}
          className={listItemClassName}
          memoDeps={[item]}
        >
          <ListItem item={item} />
        </HoverComponent>
      ))}
    </div>
  );
}

type Props = {
  className?: ClassNameValue;
  children: React.ReactNode;
  onEnter: () => void;
  onLeave: () => void;
  isActive: boolean;
  memoDeps: any[];
};
export const HoverComponent = ({
  className,
  children,
  onEnter,
  onLeave,
  isActive = false,
  memoDeps = [],
}: Props) => {
  const Child = useCallback(() => children, memoDeps);
  return (
    <div
      className="flex items-center md:p-4 pb-4 w-full"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={cn("size-fit", className, "relative group")}>
        <AnimatePresence>
          {isActive && (
            <motion.span
              className="absolute inset-0 bg-muted-foreground/35 block rounded-md -z-10"
              layoutId="hover-bg"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0 },
              }}
            />
          )}
        </AnimatePresence>
        <Child />
      </div>
    </div>
  );
};
