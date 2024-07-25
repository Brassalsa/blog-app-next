"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-72">
      <h1 className="font-semibold text-4xl ">404</h1>
      <p className="text-red-400 font-medium">Not Found</p>
      <Button variant="secondary" onClick={router.back}>
        Go back
      </Button>
    </div>
  );
}

export default NotFound;
