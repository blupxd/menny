// dashboards/layout.tsx
import React from "react";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession(authOptions);
  const subscription = session
  ? await getUserSubscriptionPlan(session?.user.id + "")
  : null;
  return (
    <main>
      <Sidebar />
      <MobileSidebar plan={subscription?.plan} session={session} />
      <div className="md:ml-[300px]">{children}</div>
    </main>
  );
};

export default DashboardLayout;
