"use client";

import { useEffect, useState } from "react";

import { useAuth, User } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({
  serverUser,
  children,
}: {
  serverUser: User | null;
  children: React.ReactNode;
}) {
  const { user, setUser } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // The server already resolved the user, so the client never has
  // to fetch the profile again just to show a name.
  useEffect(() => {
    if (serverUser) {
      setUser(serverUser);
    }
  }, [serverUser?.USER_ID]);

  const current = user ?? serverUser;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        user={current}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />

      <div
        className={cn(
          "transition-[padding] duration-300 ease-out",
          expanded ? "lg:pl-64" : "lg:pl-[76px]"
        )}
      >
        <Topbar user={current} onMenuClick={() => setDrawerOpen(true)} />

        <main className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
