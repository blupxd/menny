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
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { menuTypes } from "@/constants"; // Assuming menuTypes has type and icon
import { ChevronDown } from "lucide-react";
import { useSetType } from "@/lib/typeSelect";

const MenuTypeChanger = () => {
  const { setType, menuType } = useSetType();
  const [selectedType, setSelectedType] = useState(menuTypes[0]); // Track the selected type
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Sync selectedType with menuType
  useEffect(() => {
    const newType = menuTypes.find(type => type.type === menuType);
    if (newType) {
      setSelectedType(newType);
    }
  }, [menuType]);

  return (
    <div className="max-w-56 min-w-56 flex flex-col">
      <h1 className="text-sm mb-2 font-extralight">Types</h1>
      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
          >
            <selectedType.icon className="w-4 h-4 mr-2" />
            {selectedType.type}{" "}
            <ChevronDown
              className={`w-4 h-4 ml-auto ${isOpen && "rotate-180"} transition-all duration-100 ease-in-out`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-stone-900">
          <DropdownMenuLabel>Select your type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={menuType}
            onValueChange={(value) => {
              const newType = menuTypes.find(type => type.type === value);
              if (newType) {
                setType(newType.type);
                setSelectedType(newType); // Update selected type
              }
            }}
          >
            {menuTypes.map((type, index) => (
              <DropdownMenuRadioItem className="hover:cursor-pointer" key={index} value={type.type}>
                <type.icon className="w-4 h-4 mr-2" />
                {type.type}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuTypeChanger;
