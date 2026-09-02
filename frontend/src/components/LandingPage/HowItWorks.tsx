import { FileUp, ScanLine, ListChecks, TrendingUp } from "lucide-react";

import Reveal from "@/components/common/Reveal";

const steps = [
  {
    icon: FileUp,
    title: "Upload the report",
    desc: "Drop in a PDF or a photo of your lab report. Nothing to type out by hand.",
  },
  {
    icon: ScanLine,
    title: "We read every value",
    desc: "Each test, unit and reference range is extracted and checked against what is normal.",
  },
  {
    icon: ListChecks,
    title: "Get the explanation",
    desc: "An organ by organ breakdown, a health score and clear notes on what needs attention.",
  },
  {
    icon: TrendingUp,
    title: "Track what changes",
    desc: "Upload the next report and see the difference test by test, not guess by guess.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-slate-200 bg-slate-50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            How it works
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            From a confusing PDF to a clear answer
          </h2>
        </Reveal>

        <div className="relative mt-10">
          {/* The line that ties the four steps together on desktop. */}
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-linear-to-r from-transparent via-brand-200 to-transparent lg:block" />

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal key={step.title} delay={index * 80}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-blue-600 text-white shadow-sm shadow-brand-900/20">
                        <Icon size={20} />
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Step {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[15px] font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
