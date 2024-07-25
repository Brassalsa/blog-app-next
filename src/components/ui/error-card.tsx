"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./card";
import { PropsDefault } from "@/types";

type ErrorCtxType = {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const ErrorCardCtx = createContext<ErrorCtxType | null>(null);
const useErrorCtx = () => {
  const ctx = useContext(ErrorCardCtx);
  if (!ctx) {
    throw new Error("useErrorCtx must be used inside ErrorCard", {
      cause: "component used outside ErrorCard",
    });
  }
  return ctx;
};

type Props = ErrorCtxType & PropsDefault;

function ErrorCard({ title, description, className, children }: Props) {
  return (
    <ErrorCardCtx.Provider value={{ title, description }}>
      <Card className={cn("size-max", className)}>
        <CardContent className="px-6 py-4">
          {children || (
            <>
              <ErrorCard.Title />
              <ErrorCard.Description />
            </>
          )}
        </CardContent>
      </Card>
    </ErrorCardCtx.Provider>
  );
}

ErrorCard.Title = ({ children, className }: PropsDefault) => {
  const { title } = useErrorCtx();
  return (
    <CardTitle className={cn("text-center text-red-400", className)}>
      {children || title || "Error"}
    </CardTitle>
  );
};
ErrorCard.Description = ({ children, className }: PropsDefault) => {
  const { description } = useErrorCtx();
  return (
    <CardDescription className={cn("text-red-400 text-center", className)}>
      {children || description || "Something went wrong"}
    </CardDescription>
  );
};

export default ErrorCard;
