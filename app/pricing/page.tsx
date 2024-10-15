import Pricing from "@/components/Pricing";
import { authOptions } from "@/lib/auth";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="md:px-20 px-4 lg:px-48 flex flex-col items-center justify-center relative min-h-screen">
      <Link className="z-10 text-2xl justify-start flex items-center" href="/">
        Menny <Home className="w-5 h-5 ml-2"/>
      </Link>
      <Pricing session={session} />
      <Image alt="bg" src="/assets/bg.jpg" fill className="object-cover opacity-50" unoptimized/>
    </div>
  );
};

export default page;
