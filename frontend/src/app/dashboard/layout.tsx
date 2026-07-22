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
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        expanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
      />

      {/* Content width adjusts with the sidebar instead of staying fixed */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarExpanded ? "lg:pl-64" : "lg:pl-20"
        }`}
      >

        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main>{children}</main>
      </div>
    </div>
  );
}
