import { Shapes } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GradientLink from "./GradientLink";

const Hero = () => {
  return (
    <main className="flex relative pb-24 flex-col pt-16 h-full">
      <div className="flex z-10 flex-col text-center items-center max-w-max mx-4 md:mx-24 lg:mx-auto mt-24">
        <h1 className="text-5xl p-2 font-bold from-purple-200 to-purple-400 bg-gradient-to-r bg-clip-text text-transparent">
          Digitize Your Menu with Menny
        </h1>
        <h2 className="text-lg flex items-center">
          Effortlessly Create and Share Your Menu with a QR Code!
        </h2>
        <div className="flex items-center space-x-6 mx-auto mt-12">
          <GradientLink
            href="/register"
            className="text-white bg-gradient-to-r flex from-purple-600 via-purple-700 to-purple-800 hover:bg-gradient-to-brshadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <Shapes className="mr-2" />
            Get Started
          </GradientLink>
          <Link
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] text-white border border-white py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-white hover:text-purple-600 transition-all duration-200 ease-in-out"
            href="/pricing"
          >
            View plans
          </Link>
        </div>
        <div className="flex mx-auto p-6 text-center text-xs text-gray-600 items-center space-x-4 my-6">
        🍋 Powered by LemonSqueezy
        </div>
        <Image
          src="/assets/hero.png"
          alt="Hero Image"
          width={1000}
          height={1200}
          className="rounded-2xl border-purple-800/20 border shadow-sm shadow-gray-700/20 mx-4 md:mx-24 lg:mx-auto"
        />
      </div>
    </main>
  );
};

export default Hero;
