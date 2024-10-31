import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="md:px-20 px-4 lg:px-48 flex flex-col items-center justify-center relative min-h-screen">
      <Navbar />
      <MobileNav />
      <div className="flex max-w-max flex-col z-10">
        <h1 className="text-5xl">About Us</h1>
        <p className="text-wrap mt-4 text-lg">
          At Menny, we believe that menus should be as dynamic as the dishes they represent. Our mission is to simplify the way restaurants and businesses present their offerings by digitizing menus and transforming them into customizable QR codes.
        </p>
        <p className="text-wrap mt-4 text-lg">
          With our user-friendly platform, you can easily create, edit, and download your menus online. Simply generate a QR code that can be printed onto your flyers, tables, or wherever you need it. Customize your menu to match your brand, and give your customers a seamless dining experience.
        </p>
        <h2 className="text-purple-500 font-semibold mt-4">Why Choose Us?</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>📱 Easy-to-use platform for quick menu creation.</li>
          <li>🎨 Fully customizable QR codes and menu designs.</li>
          <li>💻 Accessible on any device, anywhere, anytime.</li>
          <li>📈 Enhance customer engagement with instant access to your menu.</li>
        </ul>
        <p className="text-wrap mt-4 text-sm">
          Join us in revolutionizing the dining experience. Whether you&apos;re a small café or a large restaurant, we have the tools you need to modernize your menu and attract more customers!
        </p>
      </div>

      <Image
        alt="About Us Background"
        src="/assets/bg.jpg"
        fill
        className="object-cover opacity-50"
        unoptimized
      />
    </div>
  );
};

export default AboutUs;
