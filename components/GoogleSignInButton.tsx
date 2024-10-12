"use client";
import React, { FC, ReactNode, useState } from "react";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import GradientButton from "./GradientButton";

interface GoogleSignInButton {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButton> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: "http://localhost:3000/dashboard",
      });
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <GradientButton disabled={isLoading} onClick={loginWithGoogle} className="w-full">
      {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </GradientButton>
  );
};

export default GoogleSignInButton;
