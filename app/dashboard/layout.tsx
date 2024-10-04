// dashboards/layout.tsx
import React from "react";
import Link from "next/link";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main>
      <Sidebar />
      <div className="ml-[300px]">{children}</div>
    </main>
  );
};

export default DashboardLayout;
