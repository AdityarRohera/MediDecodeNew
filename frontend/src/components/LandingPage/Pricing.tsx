import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

import Reveal from "@/components/common/Reveal";

const plans = [
  {
    name: "Free",
    price: "₹0",
    cadence: "forever",
    description: "Enough to understand your next lab report properly.",
    features: [
      "Upload PDF, PNG or JPG reports",
      "Organ by organ breakdown",
      "Health score and test summary",
      "Ask questions about a report",
    ],
    cta: "Start for free",
    href: "/auth/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "₹299",
    cadence: "per month",
    description: "For anyone tracking their health across many reports.",
    features: [
      "Everything in Free",
      "Unlimited report comparisons",
      "Full trend history across reports",
      "Priority analysis queue",
      "Export and share summaries",
    ],
    cta: "Upgrade to Pro",
    href: "/auth/register",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="border-t border-slate-200 bg-slate-50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Pricing
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Start free, upgrade when you track more
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            No card needed to begin. Cancel any time.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 90}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? "border-brand-300 bg-white shadow-lift"
                    : "border-slate-200 bg-white hover:shadow-card"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-brand-600 to-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    <Sparkles size={13} />
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-slate-900">
                  {plan.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-slate-950">
                    {plan.price}
                  </span>

                  <span className="text-sm text-slate-500">
                    {plan.cadence}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-brand-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-7 inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition active:scale-[0.98] ${
                    plan.featured
                      ? "bg-brand-600 text-white shadow-sm shadow-brand-900/20 hover:bg-brand-700"
                      : "border border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
