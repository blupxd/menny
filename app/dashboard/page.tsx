import MenuPage from "@/components/MenuPage";
import { authOptions } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const plan = session ? await getUserSubscriptionPlan(session?.user.id) : null
  if (session?.user) {
    return <MenuPage plan={plan?.plan}/>;
  }
  return <div>You are not signed in!</div>;
};

export default Page;
