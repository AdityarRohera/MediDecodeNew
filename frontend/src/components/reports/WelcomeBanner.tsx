"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

/*
    Shown once right after sign in. Dismissing it also drops the
    welcome flag from the url so a refresh does not bring it back.
*/
export default function WelcomeBanner() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const firstName = user?.NAME?.trim().split(/\s+/)[0];

  const dismiss = () => {
    setVisible(false);
    router.replace(pathname);
  };

  return (
    <section className="relative animate-fade-down overflow-hidden rounded-2xl border border-brand-200 bg-linear-to-r from-brand-50 via-white to-blue-50 p-5">
      <div className="flex items-start gap-3.5 pr-8">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-blue-600 text-white shadow-sm shadow-brand-900/20">
          <Sparkles size={20} />
        </span>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Welcome back{firstName ? `, ${firstName}` : ""} 👋
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            You are signed in. Everything you have uploaded is below, and a new
            report takes about a minute to analyze.
          </p>
        </div>
      </div>

      <button
        onClick={dismiss}
        aria-label="Dismiss welcome message"
        className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700"
      >
        <X size={16} />
      </button>
    </section>
  );
}
