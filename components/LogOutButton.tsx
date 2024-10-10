"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };
  return (
    <Button
      className="hover:bg-neutral-900 text-orange-500 font-normal"
      onClick={handleLogout}
      variant={"ghost"}
    >
      <LogOutIcon className="mr-2 h-4 w-4 " /> Sign Out
    </Button>
  );
};

export default LogOutButton;
