import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full relative flex flex-col">
      <Navbar />
      <MobileNav />
      <Hero />
      <div className="px-4 md:px-24 flex flex-col z-10">
        <Info />
        <Features />
        <Pricing session={session} />
      </div>
      <Image
        alt="background"
        src="/assets/background.jpg"
        fill
        className="object-cover opacity-50"
        unoptimized={true}
      />
    </div>
  );
}
