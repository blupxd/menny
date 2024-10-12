"use client";
import React, { useEffect, useState } from "react";
import MenuTypeChanger from "./MenuTypeChanger";
import { Button, buttonVariants } from "./ui/button";
import { ChevronDown, Edit, ExternalLink, X } from "lucide-react";
import ThemePicker from "./ThemePicker";
import MenuColsChanger from "./MenuColsChanger";
import { useSetName } from "@/lib/nameChanger";
import NameForm from "./forms/NameForm";
import GradientLink from "./GradientLink";
import { AnimatePresence, motion } from "framer-motion";
import GradientButton from "./GradientButton";

interface Props {
  name: string | undefined;
  id: string | undefined;
}

const CreatorNav = ({ name, id }: Props) => {
  const [editName, setEditName] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { setName, menuName } = useSetName();
  useEffect(() => setName(name!), [name]);
  return (
    <div className="flex p-6 flex-col sticky top-0 bg-black z-[15] lg:pt-6 pt-14 border-b ">
      <span className="bg-gradient-to-tr from-cyan-900/10 -z-10 to-cyan-800/10 absolute left-0 right-0 top-0 bottom-0" />
      <div className="flex items-center space-x-4 md:mb-2 my-auto">
        {editName ? (
          <div className="flex items-center w-96 space-x-2">
            <NameForm
              categoryName={menuName}
              handleEditName={(e: any) => {
                setName(e);
                setEditName(false);
              }}
            />
            <Button size="icon" onClick={() => setEditName(false)} variant="outline">
              <X className="h-4 w-4" />
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
              <Edit className="w-4 text-purple-500 h-4" />
            </Button>
          </>
        )}
        <GradientLink
          href={`/m/${id}`}
          className={`${buttonVariants({
            variant: "outline",
          })}`}
        >
          View
          <ExternalLink className="w-4 h-4 ml-2" />
        </GradientLink>
        <GradientButton
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          className="lg:hidden max-w-max"
        >
          Tools
          <ChevronDown
            className={`${
              open ? "rotate-180" : "rotate-0"
            } duration-200 transition-all  ease-in-out w-4 ml-2 h-4`}
          />
        </GradientButton>
      </div>
      <div className="hidden lg:grid grid-cols-2 lg:border-0 border-t pt-4 lg:mt-0 mt-4 lg:pt-0 lg:grid-cols-3 items-start gap-6 ">
        <MenuTypeChanger />
        <MenuColsChanger />
        <ThemePicker />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 1 }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid overflow-hidden lg:hidden grid-cols-2 lg:border-0 border-t pt-4 lg:mt-0 mt-4 lg:pt-0 lg:grid-cols-3 items-start gap-6 "
          >
            <MenuTypeChanger />
            <MenuColsChanger />
            <ThemePicker />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatorNav;
