"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/services/operations/user/auth";
import { cn } from "@/lib/utils";
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

// Title shown on the left of the navbar for each page.
const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/upload": "Upload Report",
  "/dashboard/reports": "My Reports",
  "/dashboard/analysis": "Analysis",
};

type NavbarProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {

  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const title = pageTitles[pathname] || "Dashboard";

  // Close the profile menu when clicking anywhere outside of it.
  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = async () => {

    try {
      await logout();
    } catch (error) {
      console.log("Error comes in logout ---->", error);
    } finally {
      setOpen(false);
      setUser(null);
      router.push("/auth/login");
    }
  };

  // "Sahil Rohera" -> "SR"
  const initials = (user?.name || "U")
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6">

      {/* Left: menu button (mobile) + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
            {title}
          </h1>

          <p className="hidden text-xs text-slate-500 sm:block">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </p>
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-2 sm:gap-3">

        <button
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        {/* Profile dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2.5 rounded-xl p-1.5 transition hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-sm">
              {initials}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-32 truncate text-sm font-medium text-slate-900">
                {user?.name || "User"}
              </p>

              <p className="max-w-32 truncate text-xs text-slate-500">
                {user?.email || ""}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={cn(
                "text-slate-400 transition-transform",
                open && "rotate-180"
              )}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">

              {/* User info */}
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user?.name || "User"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {user?.email || ""}
                </p>
              </div>

              <div className="p-1.5">
                <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
                  <User size={16} className="text-slate-400" />
                  My Profile
                </button>

                <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
                  <Settings size={16} className="text-slate-400" />
                  Settings
                </button>
              </div>

              <div className="border-t border-slate-100 p-1.5">
                <button
                  onClick={logoutHandler}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
