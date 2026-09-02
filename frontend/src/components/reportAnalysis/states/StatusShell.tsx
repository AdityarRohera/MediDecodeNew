import Link from "next/link";
import { ArrowLeft, LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  message: string;
  tone?: "brand" | "danger" | "slate";
  spinning?: boolean;
  children?: React.ReactNode;
};

const tones = {
  brand: "bg-linear-to-br from-brand-500 to-blue-600 text-white",
  danger: "bg-red-50 text-red-500",
  slate: "bg-slate-100 text-slate-500",
};

/*
    Shared frame for every non-completed report state, so loading,
    failure and not found all sit in the same card.
*/
export default function StatusShell({
  icon: Icon,
  title,
  message,
  tone = "brand",
  spinning = false,
  children,
}: Props) {
  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          {tone === "brand" && (
            <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-brand-300" />
          )}

          <span
            className={`relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ${tones[tone]}`}
          >
            <Icon className={`h-8 w-8 ${spinning ? "animate-spin" : ""}`} />
          </span>
        </div>

        <h1 className="mt-6 text-lg font-semibold text-slate-900">{title}</h1>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">{message}</p>

        {children}

        <Link
          href="/reports"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={15} />
          Back to my reports
        </Link>
      </div>
    </div>
  );
}
