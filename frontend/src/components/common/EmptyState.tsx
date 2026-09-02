import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  tone?: "brand" | "danger";
  bordered?: boolean;
  children?: React.ReactNode;
};

const tones = {
  brand: "bg-brand-50 text-brand-600",
  danger: "bg-red-50 text-red-500",
};

/*
    One empty / error state used by every list in the app, so a
    screen with nothing in it still looks designed.
*/
export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionHref,
  tone = "brand",
  bordered = true,
  children,
}: Props) {
  return (
    <section
      className={`animate-fade-up px-6 py-14 text-center ${
        bordered ? "rounded-2xl border border-slate-200 bg-white" : ""
      }`}
    >
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${tones[tone]}`}
      >
        <Icon className="h-7 w-7" />
      </div>

      <h2 className="mt-4 text-base font-semibold text-slate-900">{title}</h2>

      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-slate-500">
        {message}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.98]"
        >
          {actionLabel}
        </Link>
      )}

      {children}
    </section>
  );
}
