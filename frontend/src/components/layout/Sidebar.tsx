"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  GitCompare,
  LogOut,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth, User } from "@/context/AuthContext";
import { logout } from "@/services/operations/user/auth";

const navItems = [
  { name: "My Reports", href: "/reports", icon: FileText },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Analysis", href: "/analysis", icon: GitCompare },
];

type SidebarProps = {
  user: User | null;
  open: boolean;
  onClose: () => void;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
};

export const initialsOf = (name?: string) =>
  (name || "U")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Sidebar({
  user,
  open,
  onClose,
  expanded,
  onExpandedChange,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useAuth();

  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  // Mobile always shows the full drawer, desktop follows the toggle.
  const isWide = open || expanded;

  const logoutHandler = async () => {
    try {
      setSigningOut(true);

      await logout();
    } catch (error) {
      console.log("Error comes in logout ---->", error);
    } finally {
      setUser(null);
      router.push("/auth/login");
      router.refresh();
    }
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 animate-fade-in bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-[width,transform] duration-300 ease-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          isWide ? "w-64" : "w-[76px]"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-slate-100 px-4">
          <Link
            href="/reports"
            onClick={onClose}
            className="flex min-w-0 items-center gap-2.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-blue-600 shadow-sm shadow-brand-900/25">
              <Activity className="h-5 w-5 text-white" />
            </span>

            {isWide && (
              <span className="animate-fade-in truncate text-[17px] font-semibold tracking-tight text-slate-900">
                Medi<span className="text-brand-600">Decode</span>
              </span>
            )}
          </Link>

          <button
            onClick={onClose}
            className="ml-auto shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="scrollbar-slim flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {active && (
                  <span className="absolute -left-3 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />
                )}

                <Icon
                  size={19}
                  className={cn(
                    "shrink-0 transition-colors",
                    active
                      ? "text-brand-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                />

                {isWide ? (
                  <span className="whitespace-nowrap">{item.name}</span>
                ) : (
                  <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Trust note */}
        {isWide && (
          <div className="animate-fade-in px-3 pb-3">
            <div className="rounded-xl border border-brand-100 bg-brand-50/70 p-3">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
                Private by design
              </p>

              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Reports are encrypted in transit and only visible to you.
              </p>
            </div>
          </div>
        )}

        {/* Account */}
        <div className="shrink-0 border-t border-slate-100 p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl p-2",
              isWide && "bg-slate-50"
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-blue-600 text-xs font-semibold text-white">
              {initialsOf(user?.NAME)}
            </span>

            {isWide && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {user?.NAME || "User"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.EMAIL || ""}
                  </p>
                </div>

                <button
                  onClick={logoutHandler}
                  disabled={signingOut}
                  title="Sign out"
                  aria-label="Sign out"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-red-600 disabled:opacity-50"
                >
                  <LogOut size={16} />
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => onExpandedChange(!expanded)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            className="mt-2 hidden w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 lg:flex"
          >
            {expanded ? (
              <>
                <ChevronsLeft size={16} />
                Collapse
              </>
            ) : (
              <ChevronsRight size={16} />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
