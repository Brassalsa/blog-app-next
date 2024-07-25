"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error;
};

function ErrorPage({ error }: ErrorProps) {
  const router = useRouter();
  console.log(error);
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-64">
      <h1 className=" font-semibold text-2xl text-red-400 ">500</h1>
      <p className="capitalize font-normal text-red-400 ">{error.message}</p>
      <div className="flex gap-4 justify-center ">
        <Button onClick={router.back} variant={"outline"}>
          Back
        </Button>
        <Button onClick={router.refresh}>Refresh</Button>
      </div>
    </div>
  );
}

export default ErrorPage;
