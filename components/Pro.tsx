
import { Stars } from "lucide-react";
import Link from "next/link";
import React from "react";
const Pro = ({isPro}:any) => {
  return (
    !isPro && (
      <Link
        href="/pricing"
        className="text-xs flex items-center px-1 rounded-lg absolute -top-2 -left-2 bg-purple-500 z-10"
      >
        Pro <Stars className="w-4 h-4 ml-1" />
      </Link>
    )
  );
};

export default Pro;
