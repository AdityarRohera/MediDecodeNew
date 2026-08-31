import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50">
        <Icon className="h-7 w-7 text-cyan-600" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-500">
        {message}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-cyan-600 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          {actionLabel}
        </Link>
      )}
    </section>
  );
}
