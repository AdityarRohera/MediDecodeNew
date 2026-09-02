import { ArrowRight, FileText, Sparkles, Stethoscope } from "lucide-react";

import Reveal from "@/components/common/Reveal";

const rawLines = [
  "ALT (SGPT)          78 U/L      7 - 56",
  "AST (SGOT)          64 U/L      8 - 48",
  "BILIRUBIN TOTAL     1.1 mg/dL   0.3 - 1.2",
  "ALK. PHOSPHATASE    92 U/L      44 - 147",
];

const actions = [
  "Cut back on alcohol for the next 6 weeks",
  "Add 30 minutes of activity, five days a week",
  "Recheck liver enzymes in 8 weeks",
];

export default function ReportComparison() {
  return (
    <section id="example" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Before and after
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            The same four lines, finally readable
          </h2>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <FileText size={16} />
                Your lab report
              </div>

              <div className="mt-4 flex-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
                <pre className="font-mono text-[11.5px] leading-6 text-slate-600">
                  {rawLines.join("\n")}
                </pre>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Accurate, and completely unhelpful on its own.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={80}
            className="flex items-center justify-center lg:px-1"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600 shadow-card">
              <ArrowRight size={18} />
            </span>
          </Reveal>

          <Reveal delay={140}>
            <div className="flex h-full flex-col rounded-2xl border border-brand-200 bg-brand-50/50 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <Sparkles size={16} />
                MediDecode explanation
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Liver</p>

                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Borderline
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Two liver enzymes, ALT and AST, are moderately above the
                  normal range. This often follows alcohol, fatty liver or a
                  recent infection. It is not an emergency, but it should not
                  be ignored either.
                </p>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <Stethoscope size={14} />
                    Suggested next steps
                  </p>

                  <ul className="mt-2 space-y-1.5">
                    {actions.map((action) => (
                      <li
                        key={action}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Educational summary, not a diagnosis or a prescription.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
