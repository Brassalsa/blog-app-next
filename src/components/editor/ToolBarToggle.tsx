import React from "react";
import { Toggle, ToggleProps } from "../ui/toggle";
import { LucideIcon } from "lucide-react";
import TooltipComponent from "../ui/tooltip";
import { cn } from "@/lib/utils";

type Props = ToggleProps & {
  Icon: LucideIcon;
  onHoverMessage: string;
};

const ToolBarToggle = React.forwardRef<Props, any>(
  ({ Icon, onHoverMessage, ...rest }: Props, ref: any) => {
    return (
      <TooltipComponent showOnHover={() => <p>{onHoverMessage}</p>}>
        <Toggle
          {...rest}
          size={"sm"}
          ref={ref}
          className={cn({
            "bg-secondary": rest.pressed,
          })}
        >
          <Icon className="size-4" />
        </Toggle>
      </TooltipComponent>
    );
  }
);

export default ToolBarToggle;
