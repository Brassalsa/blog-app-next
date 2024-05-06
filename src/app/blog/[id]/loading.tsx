import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <div className="grid gap-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="relative flex-1 w-[80%] min-h-52 min-w-52 sm:aspect-square mx-auto" />
        <div className="flex-1 flex flex-col justify-center gap-3">
          <Skeleton className="text text-3xl font-semibold" />

          <Skeleton className="w-28" />

          <div className="flex gap-2">
            <Skeleton className="object-cover aspect-square size-12 rounded-[1000px]" />
            <div className="flex flex-col justify-center gap-1 text-sm">
              <Skeleton className="w-32 rounded-lg" />
              <Skeleton className="w-32 rounded-lg" />
            </div>
          </div>
          <Skeleton className="w-full h-32" />
        </div>
      </div>
      <Skeleton className="w-full h-full min-h-56" />
    </div>
  );
}

export default Loading;
