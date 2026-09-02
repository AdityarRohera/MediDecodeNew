import {
  Activity,
  Bot,
  GitCompare,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import Reveal from "@/components/common/Reveal";

const features = [
  {
    icon: Stethoscope,
    title: "Plain language explanations",
    desc: "Every test is rewritten in a sentence you can actually act on, with the reference range kept next to it.",
  },
  {
    icon: HeartPulse,
    title: "Grouped by organ system",
    desc: "Liver, kidney, thyroid, blood and more, each with its own status so you know where to look first.",
  },
  {
    icon: Activity,
    title: "A single health score",
    desc: "One number from 0 to 100 summarising the report, backed by the count of normal, borderline and critical results.",
  },
  {
    icon: GitCompare,
    title: "Compare across time",
    desc: "Line up two reports test by test and see exactly what improved, what slipped and what was never redone.",
  },
  {
    icon: Bot,
    title: "Ask about your report",
    desc: "A built in assistant that answers questions using the values in the report you are looking at.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "Your reports are tied to your account only. Nothing is shared, sold or shown to anyone else.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            What you get
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Everything a lab report should have told you
          </h2>

          <p className="mt-3 text-slate-600">
            MediDecode reads the report the way a clinician skims it, then
            hands you the summary in language built for patients.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} delay={index * 60}>
                <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon size={21} />
                  </span>

                  <h3 className="mt-4 text-[15px] font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.desc}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
