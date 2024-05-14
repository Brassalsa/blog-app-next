import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./card";

type Props = {
  title?: string | null;
  description?: string | null;
  className?: string;
  children?: React.ReactNode;
};
function ErrorCard({ title, description, className, children }: Props) {
  return (
    <Card className={cn("size-max border", className)}>
      <CardContent className="px-6 py-4">
        {children || (
          <>
            <ErrorCard.Title children={title} />
            <ErrorCard.Description children={description} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

ErrorCard.Title = ({ children }: { children?: React.ReactNode }) => {
  return <CardTitle className="text-center">{children || "Error"}</CardTitle>;
};
ErrorCard.Description = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CardDescription className="text-red-400 text-center">
      {children || "Something went wrong"}
    </CardDescription>
  );
};

export default ErrorCard;
