import { Github, Instagram, Linkedin, Navigation, Waypoints } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
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
      link: "/contact",
      tag: "Contact",
    },
  ];
  return (
    <footer className="bg-stone-950 z-10 ">
      <div className="grid md:grid-cols-2 pt-10 grid-cols-1 lg:grid-cols-3 md:gap-4 gap-10 px-4 md:px-24">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold bg-gradient-to-b from-gray-300 to-purple-300 bg-clip-text text-transparent">
            Menny
          </h1>
        </div>
        <ul className="flex flex-col text-sm lg:border-x md:px-6 space-y-4">
          <li className="flex items-center text-lg text-purple-600">
            Navigation <Navigation className="w-4 h-4 ml-2" />
          </li>
          {links.map((link, idx) => (
            <li key={idx}>
              <Link href={link.link}>{link.tag}</Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col text-sm md:px-6 space-y-4">
          <h1 className="flex items-center text-lg text-purple-600">
            Socials <Waypoints className="w-4 h-4 ml-2" />
          </h1>
          <Link href="https://instagram.com/matijastefanovic5" className="flex items-center"><Instagram className="w-4 h-4 mr-2" />Instagram</Link>
          <Link href="" className="flex items-center"><Linkedin className="w-4 h-4 mr-2" />LinkedIn</Link>
          <Link href="https://github.com/blupxd" className="flex items-center"><Github className="w-4 h-4 mr-2" />Github</Link>
        </div>
      </div>
      <div className="py-4 bg-black/20 col-span-3 mt-6">
        <p className="text-xs text-center text-gray-800">
          © 2021 Menny. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
