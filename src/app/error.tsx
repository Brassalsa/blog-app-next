"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error;
  reset?: (() => void) | undefined;
  statusCode?: number;
};

function ErrorPage(p: ErrorProps) {
  const router = useRouter();
  const reset = p.reset || (() => router.refresh());
  const back = () => router.back();

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-64">
      <h1 className=" font-semibold text-2xl text-red-400 ">
        {p.statusCode || 500}
      </h1>
      <p className="capitalize font-normal text-red-400 ">{p.error.message}</p>
      <div className="flex gap-4 justify-center ">
        <Button onClick={back} variant={"outline"}>
          Back
        </Button>
        <Button onClick={reset}>Refresh</Button>
      </div>
    </div>
  );
}

export default ErrorPage;
