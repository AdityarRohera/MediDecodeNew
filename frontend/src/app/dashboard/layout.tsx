"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content sits beside the sidebar on large screens */}
      <div className="lg:pl-64">

        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main>{children}</main>
      </div>
    </div>
  );
}
