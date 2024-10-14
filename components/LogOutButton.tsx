"use client";
import React from "react";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import GradientButton from "./GradientButton";

const LogOutButton = () => {
  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };
  return (
    <GradientButton onClick={handleLogout} className="flex items-center w-full">
      <LogOutIcon className="mr-2 h-4 w-4 " /> Sign Out
    </GradientButton>
  );
};

export default LogOutButton;
