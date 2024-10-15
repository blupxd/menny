import MenuQR from "@/components/MenuQR";
import React from "react";

const page = () => {
  return (
    <div className="px-4 pt-24 pb-4 md:p-12 bg-gradient-to-tr from-cyan-900/10 to-purple-600/10 min-h-screen flex space-y-12 flex-col">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold bg-gradient-to-b from-gray-300 to-purple-300 bg-clip-text text-transparent">
          Preview and download your menu QR code
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 z-10">
        <MenuQR />
      </div>
    </div>
  );
};

export default page;
