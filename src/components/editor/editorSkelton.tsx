import React from "react";
import { Skeleton } from "../ui/skeleton";
import MultiplyNode from "../ui/multiply-node";

type Props = {
  numOfExten?: number;
};
function EditorLoading({ numOfExten = 12 }: Props) {
  return (
    <>
      <div className="flex gap-3 justify-center items-center border p-1 rounded-md">
        <MultiplyNode
          node={<Skeleton className="h-8 w-8" />}
          times={numOfExten}
        />
      </div>
      <Skeleton className="h-[300px] w-full" />
    </>
  );
}

export default EditorLoading;
