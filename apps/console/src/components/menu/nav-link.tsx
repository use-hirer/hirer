import { cn } from "@console/lib/utils";
import { IconProps } from "@phosphor-icons/react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface NavLinkProps {
  icon: React.ElementType<IconProps>;
  label: string;
  suffix?: React.ReactNode;
  selected?: boolean;
  href: string;
  collapsed?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  icon: Icon,
  label,
  suffix,
  selected = false,
  href,
  collapsed = false,
}) => {
  return (
    <>
      {collapsed ? (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                className={cn([
                  "flex items-center justify-center px-2 py-2 rounded-md cursor-pointer",
                  selected && "bg-black",
                  !selected && "hover:bg-zinc-300/30",
                ])}
                href={href}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  color={selected ? "white" : "black"}
                />
              </Link>
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
        <Link
          className={cn([
            "flex items-center px-2 py-2 rounded-md cursor-pointer",
            selected && "bg-black",
            !selected && "hover:bg-zinc-300/30",
          ])}
          href={href}
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
        </Link>
      )}
    </>
  );
};

export default NavLink;
