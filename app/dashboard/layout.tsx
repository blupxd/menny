// dashboards/layout.tsx
import React from "react";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <Sidebar />
      <MobileSidebar session={session} />
      <div className="md:ml-[300px]">{children}</div>
    </main>
  );
};

export default DashboardLayout;
