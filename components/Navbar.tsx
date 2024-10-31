import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
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
    <nav className="border-b border-purple-800/20 hidden bg-stone-950/10 backdrop-blur-sm text-sm font-light w-full top-0 fixed px-24 py-2 lg:flex items-center z-20">
      <Link className="text-lg justify-start" href="/">
        Menny
      </Link>
      <ul className="flex absolute left-1/2 -translate-x-1/2 space-x-8 items-center">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link href={link.link}>{link.tag}</Link>
          </li>
        ))}
      </ul>
      <div className="flex ml-auto items-center space-x-2">
        <Link
          className={`${buttonVariants({
            variant: "ghost",
          })}`}
          href="/login"
        >
          Login
        </Link>
        <Link
          className="text-white flex items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg px-5 py-2.5 text-center"
          href="/register"
        >
          Sign up <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
