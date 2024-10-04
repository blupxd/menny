import React from "react";
import MenuTypeChanger from "./MenuTypeChanger";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import ThemePicker from "./ThemePicker";
import MenuColsChanger from "./MenuColsChanger";

const CreatorNav = ({ menuName }: any) => {
  return (
    <div className="flex p-6 flex-col sticky top-0 z-10 border-b bg-stone-950">
      <div className="flex items-center space-x-4 my-auto">
        <h1 className="text-xl font-extralight">{menuName}</h1>
        <Button variant="ghost" size="icon">
          <Edit className="w-4 text-orange-500 h-4" />
        </Button>
      </div>
      <div className="flex items-start space-x-24">
        <MenuTypeChanger />
        <MenuColsChanger />
        <ThemePicker />
      </div>
    </div>
  );
};

export default CreatorNav;
