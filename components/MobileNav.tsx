"use client";
import { AlignRight, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const links = [
    {
      link: "/",
      tag: "Home",
    },
    {
      link: "/pricing",
      tag: "Pricing",
    },
    {
      link: "/about-us",
      tag: "About us",
    },
    {
      link: "/customer-help",
      tag: "Help",
    },
  ];

  return (
    <nav className="border-b border-purple-800/20 lg:hidden bg-stone-950/90 backdrop-blur-sm text-sm font-light w-full top-0 fixed px-4 py-4 flex justify-between items-center z-20">
      <Link className="text-lg" href="/">
        Menny
      </Link>
      <Button
        onClick={() => setOpen(!open)}
        size="icon"
      >
        {open ? <X /> : <AlignRight />}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex absolute left-0 space-y-12 w-full h-screen bg-stone-950/90 p-12 inset-16 right-0 flex-col items-center z-10"
          >
            {links.map((link, idx) => (
              <li key={idx} className="text-xl">
                <Link href={link.link}>{link.tag}</Link>
              </li>
            ))}
            <div className="flex flex-col w-full space-y-6">
              <Link
                className={`${buttonVariants({
                  variant: "default",
                })} text-lg`}
                href="/login"
              >
                Login
              </Link>
              <Link
                className="text-white flex items-center justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg px-5 py-2.5 text-center"
                href="/register"
              >
                Sign up <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNav;
