import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="md:px-20 px-4 lg:px-48 flex flex-col items-center justify-center relative min-h-screen">
      <Navbar />
      <MobileNav />
      <div className="flex max-w-max flex-col z-10">
        <h1 className="text-5xl">Need Assistance?</h1>
        <p className="text-wrap mt-4 text-lg">
          We're here to help! If you have any questions, concerns, or need
          support, please don’t hesitate to reach out to us. Our team is ready
          to assist you with any inquiries you may have.
        </p>
        <h2 className="text-purple-500 font-semibold mt-4">Contact Us:</h2>
        <Link
          href="mailto:mennysupport@gmail.com"
          className="flex items-center pb-2 border-b"
        >
          <EnvelopeClosedIcon className="w-6 h-6 mr-2" />
          <span className="italic text-gray-00">mennysupport@gmail.com</span>
        </Link>
        <p className="text-wrap mt-4 text-sm">
          We aim to respond to all emails within 24 hours. Thank you for
          reaching out, and we look forward to assisting you!
        </p>
      </div>

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
