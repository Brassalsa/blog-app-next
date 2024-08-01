"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropsDefault } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

type ErrorProps = {
  error: string | Error;
  statusCode?: number;
};

const ErrCtx = createContext<ErrorProps | null>(null);

const useErrCtx = () => {
  const ctx = useContext(ErrCtx);
  if (!ctx) {
    throw new Error("useErrCtx must be used inside ErrorPage", {
      cause: "component used outside ErrorPage",
    });
  }
  return ctx;
};

function ErrorPage({
  error,
  statusCode = 500,
  children,
  className,
}: ErrorProps & PropsDefault) {
  console.log(error);
  return (
    <ErrCtx.Provider value={{ error, statusCode }}>
      <div
        className={cn(
          "flex flex-col gap-4 justify-center items-center min-h-64",
          className
        )}
      >
        {children || (
          <>
            <ErrorPage.Title />
            <ErrorPage.Content />
            <ErrorPage.Footer />
          </>
        )}
      </div>
    </ErrCtx.Provider>
  );
}

ErrorPage.Title = ({ children, className }: PropsDefault) => {
  const { statusCode } = useErrCtx();
  return (
    <h1 className={cn("font-semibold text-2xl text-red-400", className)}>
      {children || statusCode}
    </h1>
  );
};

ErrorPage.Content = ({ children, className }: PropsDefault) => {
  const { error } = useErrCtx();
  return (
    <p className={cn("capitalize font-normal text-red-400", className)}>
      {children || (typeof error === "string" ? error : error.message)}
    </p>
  );
};

ErrorPage.Footer = ({ children, className }: PropsDefault) => {
  const router = useRouter();
  return (
    <div className={cn("flex gap-4 justify-center", className)}>
      {children || (
        <>
          <Button onClick={router.back} variant={"outline"}>
            Back
          </Button>
          <Button onClick={router.refresh}>Refresh</Button>
        </>
      )}
    </div>
  );
};

export default ErrorPage;
