import Pricing from "@/components/Pricing";
import { authOptions } from "@/lib/auth";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="md:px-20 px-4 lg:px-48 flex flex-col items-center justify-center min-h-screen">
      <Link className="text-3xl font-semibold justify-start flex items-center" href="/">
        Menny <Home className="w-8 h-8 ml-2"/>
      </Link>
      <Pricing session={session} />
    </div>
  );
};

export default page;
