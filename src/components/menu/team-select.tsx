"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Cube, SmileySad } from "@phosphor-icons/react";

const frameworks = [
  {
    value: "Team Nick",
    label: (
      <div className="flex items-center gap-2">
        <Cube size={16} />
        <div>Team Nick</div>
      </div>
    ),
  },
];

export function TeamSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white px-2"
        >
          {value ? (
            frameworks.find((framework) => framework.value === value)?.label
          ) : (
            <div className="flex items-center gap-2">
              <Cube size={16} />
              <div>Team Nick</div>
            </div>
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[228px] p-0">
        <Command>
          <CommandInput placeholder="Find Team..." className="h-9" />
          <CommandEmpty>
            <div className="flex items-center justify-center gap-1">
              No team found!
              <SmileySad weight="duotone" color="orange" size={18} />
            </div>
          </CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
