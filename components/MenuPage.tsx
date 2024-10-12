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
import GradientLink from "./GradientLink";

const MenuPage = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  const togglePopup = () => {
    setShowPopup((prev) => !prev); // Toggle popup visibility
  };
  return (
    <div className="p-12 bg-gradient-to-tr from-cyan-900/10 to-purple-600/10 min-h-screen flex space-y-12 flex-col">
      <MenuCreatePopUp show={showPopup} onClose={togglePopup} />
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold bg-gradient-to-b from-gray-300 to-purple-300 bg-clip-text text-transparent">
          Create or edit existing menus
        </h1>
        <p className="text-sm font-light text-neutral-500">
          (You have 1 menu available to create)
        </p>
        <GradientLink
          href="/pricing"
          className="text-xs py-3 mt-2 max-w-max text-purple-500"
        >
          Upgrade now <PartyPopper className="w-4 h-4 ml-2" />
        </GradientLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-10">
        <MenuCards />
        <Card className="h-52 bg-gradient-to-tr from-purple-800/10 to-cyan-800/10">
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
              className="px-6 hover:text-purple-500 py-2 h-full border hover:bg-transparent hover:border-purple-500"
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
