import Image from "next/image";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Plus, Stars } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { AccordionContent } from "./ui/accordion";
import { accordionMenu, menuItems } from "@/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogOutButton from "./LogOutButton";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const subscription = session
    ? await getUserSubscriptionPlan(session?.user.id + "")
    : null;

  const handlePlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "text-orange-300";
      case "premium":
        return "text-purple-700";
      case "standard":
        return "text-purple-400";
      default:
        return "text-gray-300";
    }
  };
  return (
    <div className="px-6 py-6 border-r md:flex hidden flex-col bg-gradient-to-tr from-purple-950/10 to-cyan-600/10 min-h-screen min-w-[300px] w-[300px] fixed">
      <div className="flex mb-2 items-center space-x-4">
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

        {/* Name Section */}
        <div className="flex-grow flex flex-col">
          <h1 className="text-sm">
            {session?.user.name} {session?.user.lastname}
          </h1>
          {subscription?.plan && (
            <p
              className={`${handlePlanColor(
                subscription?.plan + ""
              )} text-xs items-center flex font-semibold`}
            >
              You have {subscription.plan} plan
              <Stars className="ml-2 w-4 h-4" />
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        {menuItems.map((tag) => (
          <Link
            key={tag.label}
            href={tag.link}
            className={`${buttonVariants} hover:bg-neutral-900 font-light text-sm flex items-center p-2`}
          >
            <tag.icon className="mr-2 h-4 w-4" />
            {tag.label}
          </Link>
        ))}
      </div>
      <Separator className="my-2" />
      <Accordion type="single" collapsible className="w-full">
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
                
              </Link>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
      <Separator className="my-2" />

      {/* Sign Out Button positioned at the bottom */}
      <div className="mt-auto">
        <LogOutButton />
      </div>
    </div>
  );
};

export default Sidebar;
