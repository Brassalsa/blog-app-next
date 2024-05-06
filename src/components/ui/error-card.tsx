import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title?: string | null;
  description?: string | null;
  className?: string;
  children?: React.ReactNode;
};
function ErrorCard({ title, description, className, children }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col w-full gap-3 text-red-400 items-center",
        className
      )}
    >
      {children || (
        <>
          <ErrorCard.Title children={title} />
          <ErrorCard.Description children={description} />
        </>
      )}
    </div>
  );
}

ErrorCard.Title = ({ children }: { children?: React.ReactNode }) => {
  return <h3 className="text-lg font-semibold">{children || "Error"}</h3>;
};
ErrorCard.Description = ({ children }: { children?: React.ReactNode }) => {
  return <p className="font-medium">{children || "Something went wrong"}</p>;
};

export default ErrorCard;
