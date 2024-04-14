"use client";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
  handleClick?: Function;
};
function SignInCard({ className, children, handleClick }: Props) {
  return (
    <button
      onClick={() => handleClick?.()}
      className={cn(
        "m-2 p-2 w-32 rounded-md hover:opacity-75 transition-opacity duration-200 border border-primary",
        className
      )}
    >
      {children}
    </button>
  );
}

export default SignInCard;
