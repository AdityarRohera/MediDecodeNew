"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Menu, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth, User } from "@/context/AuthContext";
import { logout } from "@/services/operations/user/auth";
import { initialsOf } from "./Sidebar";

// Shown on the left of the bar so the current section is always named.
const pageTitles: { match: string; title: string; subtitle: string }[] = [
  {
    match: "/reports",
    title: "My Reports",
    subtitle: "Every report you have uploaded, analyzed and scored",
  },
  {
    match: "/upload",
    title: "Upload Report",
    subtitle: "Add a new lab report for analysis",
  },
  {
    match: "/analysis",
    title: "Analysis",
    subtitle: "Trends and side by side comparisons",
  },
];

export default function Topbar({
  user,
  onMenuClick,
}: {
  user: User | null;
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // A single report gets its own title instead of the list heading.
  const page = /^\/reports\/.+/.test(pathname)
    ? {
        title: "Report analysis",
        subtitle: "Full breakdown of this lab report",
      }
    : pageTitles.find((item) => pathname.startsWith(item.match)) ??
      pageTitles[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={onMenuClick}
        className="-ml-1 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[15px] font-semibold text-slate-900 sm:text-base">
          {page.title}
        </h1>

        <p className="hidden truncate text-xs text-slate-500 sm:block">
          {page.subtitle}
        </p>
      </div>

      {!pathname.startsWith("/upload") && (
        <Link
          href="/upload"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm shadow-brand-900/15 transition hover:bg-brand-700 active:scale-[0.98]"
        >
          <Plus size={17} />
          <span className="hidden sm:inline">Upload report</span>
        </Link>
      )}

      <div ref={menuRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100"
          aria-label="Account menu"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-blue-600 text-xs font-semibold text-white">
            {initialsOf(user?.NAME)}
          </span>

          <ChevronDown
            size={16}
            className={cn(
              "hidden text-slate-400 transition-transform sm:block",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-60 origin-top-right animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
            <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.NAME || "User"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.EMAIL || ""}
              </p>
            </div>

            <div className="p-1.5">
              <button
                onClick={logoutHandler}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
