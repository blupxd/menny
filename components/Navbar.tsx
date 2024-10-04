import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountnav from "./UserAccountnav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="border-b border-orange min-w-full top-0 fixed px-10 py-2 flex justify-end">
      {session?.user ? (
        <UserAccountnav />
      ) : (
        <Link className={buttonVariants()} href="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
