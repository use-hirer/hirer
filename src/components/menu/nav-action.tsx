"use client";

import { cn } from "@/lib/utils";
import { IconProps } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface NavActionProps {
  icon: React.ElementType<IconProps>;
  label: string;
  suffix?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  collapsed: boolean;
}

const NavAction: React.FC<NavActionProps> = ({
  icon: Icon,
  label,
  suffix,
  selected = false,
  onClick,
  collapsed = false,
}) => {
  return (
    <>
      {collapsed ? (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                className={cn([
                  "flex items-center justify-center px-2 py-2 rounded-md cursor-pointer",
                  selected && "bg-black",
                  !selected && "hover:bg-zinc-300/30",
                ])}
                onClick={onClick}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  color={selected ? "white" : "black"}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {label}
              {/* {link.label && (
            <span className="ml-auto text-muted-foreground">
              {link.label}
            </span>
          )} */}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div
          className={cn([
            "flex items-center px-2 py-2 rounded-md cursor-pointer",
            selected && "bg-black",
            !selected && "hover:bg-zinc-300/30",
          ])}
          onClick={onClick}
        >
          <Icon className="h-4 w-4" color={selected ? "white" : "black"} />
          <div
            className={cn([
              "pl-2 text-sm font-medium",
              selected && "text-white",
            ])}
          >
            {label}
          </div>
          {suffix}
        </div>
      )}
    </>
  );
};

export default NavAction;
