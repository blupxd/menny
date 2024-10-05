"use client";
import React, { useEffect, useState } from "react";
import MenuTypeChanger from "./MenuTypeChanger";
import { Button, buttonVariants } from "./ui/button";
import { Edit, ExternalLink, X } from "lucide-react";
import ThemePicker from "./ThemePicker";
import MenuColsChanger from "./MenuColsChanger";
import { useSetName } from "@/lib/nameChanger";
import NameForm from "./forms/NameForm";
import Link from "next/link";

const CreatorNav = ({ name, id }: any) => {
  const [editName, setEditName] = useState<boolean>(false);
  const { setName, menuName } = useSetName();
  useEffect(() => setName(name), [name]);
  return (
    <div className="flex p-6 flex-col sticky top-0 z-10 border-b bg-stone-950">
      <div className="flex items-center space-x-4 mb-2 my-auto">
        {editName ? (
          <div className="flex items-center w-96 space-x-2">
            <NameForm
              categoryName={menuName}
              handleEditName={(e: any) => {
                setName(e);
                setEditName(false);
              }}
            />
            <Button onClick={() => setEditName(false)} variant="outline">
              Cancel <X className="h-4 w-4 ml-2" />
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-extralight">{menuName}</h1>
            <Button
              onClick={() => setEditName(true)}
              variant="ghost"
              size="icon"
            >
              <Edit className="w-4 text-orange-500 h-4" />
            </Button>
          </>
        )}
        <Link
          href={`/m/${id}`}
          className={`${buttonVariants({
            variant: "outline",
          })}`}
        >
          View in link <ExternalLink className="w-4 h-4 ml-2"/>
        </Link>
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
