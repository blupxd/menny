import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="md:px-20 px-4 lg:px-48 flex flex-col items-center justify-center relative min-h-screen">
      <Navbar />
      <MobileNav />
      <Pricing session={session} />
      <Image
        alt="bg"
        src="/assets/bg.jpg"
        fill
        className="object-cover opacity-50"
        unoptimized
      />
    </div>
  );
};

export default page;
