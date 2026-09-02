import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Example", href: "#example" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/auth/login" },
      { label: "Create account", href: "/auth/register" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-blue-600">
                <Activity className="h-5 w-5 text-white" />
              </span>

              <span className="text-lg font-semibold tracking-tight text-white">
                MediDecode
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Lab reports, explained in language that makes sense, so you can
              have a better conversation with your doctor.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">
                {column.title}
              </h3>

              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Ready to decode a report?
            </h3>

            <Link
              href="/auth/register"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Get started free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            MediDecode provides educational summaries of laboratory reports. It
            is not a medical device and does not provide diagnosis or
            treatment. Always confirm results with a qualified healthcare
            professional.
          </p>

          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} MediDecode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
