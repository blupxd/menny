
import Pricing from "@/components/Pricing";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions)
  return <div className="px-48 flex items-center justify-center min-h-screen">
    <Pricing session={session} />
  </div>;
};

export default page;
