"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Upload,
  FileText,
  GitCompare,
  Activity,
  ShieldCheck,
  X,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Upload",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    name: "Analysis",
    href: "/dashboard/analysis",
    icon: GitCompare,
  },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {

  const pathname = usePathname();

  // /dashboard should only be active on the exact page,
  // other tabs stay active on their nested pages too.
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Dark overlay behind the drawer on mobile */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-sm shadow-blue-900/20">
              <Activity className="h-5 w-5 text-white" />
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900">
              MediDecode
            </span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-linear-to-r from-cyan-50 to-blue-50 text-cyan-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {/* Left accent bar on the active tab */}
                {active && (
                  <span className="absolute left-0 h-6 w-1 rounded-r-full bg-cyan-600" />
                )}

                <Icon
                  size={18}
                  className={cn(
                    active
                      ? "text-cyan-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer badge */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-600" />

              <p className="text-xs font-semibold text-slate-800">
                Secure & Private
              </p>
            </div>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              Your reports are encrypted during analysis.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
