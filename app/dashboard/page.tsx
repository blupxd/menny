import MenuPage from "@/components/MenuPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <MenuPage />;
  }
  return <div>You are not signed in!</div>;
};

export default Page;
