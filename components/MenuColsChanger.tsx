"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, Columns } from "lucide-react";
import { useStoreCols } from "@/lib/columnSelect";
const MenuColsChanger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const columnOptions = [1, 2];
  const { columns, setCols } = useStoreCols();
  return (
    <div className="max-w-full md:max-w-48 flex flex-col">
      <h1 className="text-sm mb-2 font-extralight">Columns</h1>
      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
            variant="outline"
          >
            <Columns className="w-4 h-4 mr-2" />
            {columns} Column{columns > 1 && "s"}
            <ChevronDown
              className={`w-4 h-4 ml-auto ${
                isOpen && "rotate-180"
              } transition-all duration-100 ease-in-out`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-stone-900">
          <DropdownMenuLabel>Select columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={columns + ""}
            onValueChange={(value) => setCols(parseInt(value))}
          >
            {columnOptions.map((col) => (
              <DropdownMenuRadioItem
                className="hover:cursor-pointer"
                key={col}
                value={col + ""}
              >
                <Columns className="w-4 h-4 mr-2" />
                {col} Column{col > 1 && "s"}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuColsChanger;
