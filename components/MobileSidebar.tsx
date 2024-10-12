"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { AlignRight, EllipsisVertical, Plus, X } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { AccordionContent } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { accordionMenu, menuItems } from "@/constants";
import LogOutButton from "./LogOutButton";
import { AnimatePresence, motion } from "framer-motion";
import { SessionProviderProps } from "next-auth/react";

const MobileSidebar = ({ session }: SessionProviderProps) => {
  const [menu, setMenu] = useState<boolean>(false);

  // const handlePlanColor = (plan: string) => {
  //   switch (plan) {
  //     case "free":
  //       return "text-orange-300";
  //     case "premium":
  //       return "text-purple-500";
  //     case "standard":
  //       return "text-indigo-400";
  //     default:
  //       return "text-gray-300";
  //   }
  // };

  return (
    <nav
      className={`flex flex-col lg:hidden items-end right-0 h-full left-0 transition-all duration-300 ease-in-out fixed top-0 ${
        menu && "bg-black/50 z-50"
      }`}
    >
      <Button
        onClick={() => setMenu(!menu)}
        variant="ghost"
        className="m-6 text-right z-20"
        size="icon"
      >
        {menu ? <X /> : <AlignRight />}
      </Button>
      {menu && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6 pb-4 pt-16 border-l fixed top-0 flex flex-col bg-black min-h-screen min-w-[300px] w-[300px] z-10"
          >
            <span className="bg-gradient-to-tr from-purple-950/10 to-cyan-600/10 absolute left-0 right-0 top-0 bottom-0 z-10" />
            <div className="flex items-center space-x-4 my-4 z-50">
              <div className="rounded-full relative bg-purple-700 overflow-hidden h-8 w-8 flex items-center justify-center">
                {session?.user.image ? (
                  <Image
                    fill
                    className="object-cover"
                    src={session?.user.image}
                    alt={`${session?.user.name || "User"}'s profile picture`}
                  />
                ) : (
                  <p>
                    {session?.user.name?.[0] || "U"}
                    {session?.user.lastname?.[0] || "N"}
                  </p>
                )}
              </div>

              <div className="flex-grow flex flex-col">
                <h1 className="text-sm">
                  {session?.user.name} {session?.user.lastname}
                </h1>
              </div>

              <Button
                onClick={() => setMenu(!menu)}
                variant="ghost"
                className="w-6 hover:bg-neutral-900 p-1 h-6 ml-auto"
              >
                <EllipsisVertical />
              </Button>
            </div>

            <div className="flex flex-col z-20">
              {menuItems.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.link}
                  onClick={() => setMenu(!menu)}
                  className={`${buttonVariants} hover:bg-neutral-900 font-light text-sm flex items-center p-2`}
                >
                  <tag.icon className="mr-2 h-4 w-4" />
                  {tag.label}
                </Link>
              ))}
            </div>
            <Separator className="my-2" />
            <Accordion type="single" collapsible className="w-full z-50">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm flex items-center justify-between text-left p-2 w-full hover:bg-neutral-900">
                  Menu Tools <Plus className="h-4 w-4" />
                </AccordionTrigger>
                {accordionMenu.map((menu, index) => (
                  <AccordionContent
                    key={index}
                    className="text-xs flex flex-col pb-2"
                  >
                    <Link
                      onClick={() => setMenu(!menu)}
                      style={{
                        justifyContent: "start",
                      }}
                      href={menu.link}
                      className={`flex justify-start items-center hover:bg-purple-500 ${buttonVariants(
                        {
                          variant: "ghost",
                        }
                      )}`}
                    >
                      <menu.icon className="mr-4 h-4 w-4" />
                      {menu.label}
                      {menu.numberOfMenus && (
                        <Badge variant="secondary" className="ml-auto">
                          {menu.numberOfMenus}
                        </Badge>
                      )}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
            <Separator className="my-2" />

            <div className="mt-auto z-50">
              <LogOutButton />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
};

export default MobileSidebar;
