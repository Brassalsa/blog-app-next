import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

type Props = ButtonProps & {
  children?: React.ReactNode;
};
export function ButtonLoading({ children, ...rest }: Props) {
  return (
    <Button {...rest} disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
