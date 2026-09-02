import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

const trustPoints = [
  "No credit card needed",
  "Encrypted in transit",
  "Results in under a minute",
];

// A miniature of the real analysis screen, so the hero shows the
// actual product instead of a stock illustration.
const previewRows = [
  { organ: "Liver", value: "ALT 78 U/L", status: "Borderline" },
  { organ: "Kidney", value: "Creatinine 0.9 mg/dL", status: "Normal" },
  { organ: "Blood", value: "Hemoglobin 11.2 g/dL", status: "Borderline" },
  { organ: "Thyroid", value: "TSH 2.4 mIU/L", status: "Normal" },
];

const tone: Record<string, string> = {
  Normal: "bg-emerald-50 text-emerald-700",
  Borderline: "bg-amber-50 text-amber-700",
};

const RING = 2 * Math.PI * 32;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-aurora">
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-brand-700 backdrop-blur">
            <Sparkles size={14} />
            AI analysis for everyday lab reports
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem]">
            Understand your medical reports
            <span className="block bg-linear-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
              without a medical degree
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-600">
            Upload a blood test or lab report and MediDecode explains every
            value in plain language, groups it by organ system, scores your
            overall health and tracks how it changes over time.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/auth/register"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.98]"
            >
              Analyze my report
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/auth/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-slate-400 hover:bg-white"
            >
              I already have an account
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <CheckCircle2 size={16} className="text-brand-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Product preview */}
        <div
          className="animate-fade-up lg:pl-4"
          style={{ animationDelay: "120ms" }}
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-brand-200/50 to-blue-200/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                  <FileText className="h-5 w-5 text-red-500" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    Full Body Checkup.pdf
                  </p>

                  <p className="text-xs text-slate-500">
                    Analyzed · 24 tests · 6 organ systems
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Healthy
                </span>
              </div>

              <div className="flex items-center gap-5 border-b border-slate-100 px-5 py-5">
                <div className="relative h-20 w-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                    />

                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="url(#heroRing)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={RING}
                      strokeDashoffset={RING * 0.22}
                      className="animate-draw"
                      style={{ "--draw-length": RING } as React.CSSProperties}
                    />

                    <defs>
                      <linearGradient id="heroRing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#16a7ad" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-semibold text-slate-900">
                      78
                    </span>

                    <span className="text-[10px] text-slate-400">/100</span>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Health score
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Most markers are in range. Liver enzymes are slightly
                    elevated and worth rechecking in 8 weeks.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {previewRows.map((row, index) => (
                  <div
                    key={row.organ}
                    className="flex animate-slide-left items-center gap-3 px-5 py-3"
                    style={{ animationDelay: `${300 + index * 90}ms` }}
                  >
                    <span className="w-16 shrink-0 text-xs font-medium text-slate-500">
                      {row.organ}
                    </span>

                    <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-700">
                      {row.value}
                    </span>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${tone[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500">
                <Lock size={13} />
                Only you can see this report
              </div>
            </div>

            <div className="absolute -bottom-14 left-2 z-10 hidden animate-float items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-card sm:flex">
              <TriangleAlert size={16} className="text-amber-500" />

              <div>
                <p className="text-xs font-semibold text-slate-900">
                  2 values need attention
                </p>

                <p className="text-[11px] text-slate-500">
                  Flagged automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
