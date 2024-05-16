import React from "react";
import MultiplyNode from "../ui/multiply-node";
import { Skeleton } from "../ui/skeleton";

function CommentLoader() {
  return (
    <div className="flex flex-col gap-3">
      <MultiplyNode node={<Skeleton className="h-20 w-full" />} times={5} />
    </div>
  );
}

export default CommentLoader;
