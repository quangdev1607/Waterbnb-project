"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "beach",
    label: "Beach",
  },
  {
    value: "trending",
    label: "Trending",
  },
  {
    value: "beachfront",
    label: "Beachfront",
  },
  {
    value: "erathhome",
    label: "Earth Home",
  },
  {
    value: "luxe",
    label: "Luxe",
  },
  {
    value: "amazingView",
    label: "Amazing View",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "pool",
    label: "Pool",
  },
  {
    value: "tiny",
    label: "Tiny Home",
  },
  {
    value: "historic",
    label: "Historic Home",
  },
  {
    value: "countryside",
    label: "Countryside",
  },
  {
    value: "omg",
    label: "WOW!",
  },
  {
    value: "surfing",
    label: "Surfing",
  },
];

export function CategoryBox({ categoryName }: { categoryName: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(categoryName);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <input type="hidden" name="categoryName" value={value} />
        <Label className="mb-2">Category:</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className=" w-full justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Select framework..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No category found.</CommandEmpty>
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
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
