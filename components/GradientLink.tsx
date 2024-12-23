import Link from "next/link";
import React, { ReactNode } from "react";

interface GradientLinkProps {
  href: string; // Required prop for the link URL
  children: ReactNode; // Required prop for the link content
  className?: string;
 // Optional prop for additional CSS class names
}

const GradientLink: React.FC<GradientLinkProps> = ({
  href,
  children,
  className,

}) => {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center px-6 overflow-hidden font-bold text-white rounded-lg shadow-2xl group ${className}`}
    >
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-purple-800 to-blue-900 group-hover:opacity-100"></span>

      <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>

      <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>

      <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>

      <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>

      <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>

      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>

      <span className="relative flex items-center">{children}</span>
    </Link>
  );
};

export default GradientLink;
