import React from "react";
import { Toggle, ToggleProps } from "../ui/toggle";
import { LucideIcon } from "lucide-react";
import TooltipComponent from "../ui/tooltip";

type Props = ToggleProps & {
  Icon: LucideIcon;
  onHoverMessage: string;
};

function ToolBarToggle({ Icon, onHoverMessage, ...rest }: Props) {
  return (
    <TooltipComponent showOnHover={() => <p>{onHoverMessage}</p>}>
      <Toggle {...rest} size={"sm"}>
        <Icon className="size-4" />
      </Toggle>
    </TooltipComponent>
  );
}

export default ToolBarToggle;
