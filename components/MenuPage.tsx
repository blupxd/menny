"use client";

import MenuCards from "@/components/MenuCards";
import MenuCreatePopUp from "@/components/MenuCreatePopUp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PartyPopper, Plus, UtensilsCrossed } from "lucide-react";
import React, { useState } from "react";

const MenuPage = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  const togglePopup = () => {
    setShowPopup((prev) => !prev); // Toggle popup visibility
  };
  return (
    <div className="p-12 flex space-y-12 flex-col">
      <MenuCreatePopUp show={showPopup} onClose={togglePopup} />
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold text-white">
          Create or edit existing menus
        </h1>
        <p className="text-sm font-light text-neutral-500">
          (You have 1 menu available to create)
        </p>
        <Button
          variant="outline"
          className="text-xs mt-2 max-w-max text-orange-500"
        >
          Upgrade now <PartyPopper className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MenuCards />
        <Card className="h-52">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <UtensilsCrossed className="w-5 h-5 mr-2" /> Create new menu
            </CardTitle>
            <CardDescription className="text-xs">
              Make your new menu for your restaurant or cafe
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button
              onClick={togglePopup}
              variant="ghost"
              className="px-6 hover:text-orange-500 py-2 h-full border hover:bg-transparent hover:border-orange-500"
            >
              <Plus className="w-8 h-8 " />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenuPage;
