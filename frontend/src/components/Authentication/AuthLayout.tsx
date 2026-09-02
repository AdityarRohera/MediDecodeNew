import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Brain,
  ShieldCheck,
} from "lucide-react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface Props {
  authType: "Login" | "Register";
}

const highlights = [
  {
    icon: Brain,
    title: "AI that reads the whole report",
    desc: "Every test, unit and range, explained in plain language.",
  },
  {
    icon: BarChart3,
    title: "Progress you can see",
    desc: "Compare reports over time and watch the numbers move.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "Encrypted in transit and visible only to your account.",
  },
];

export default function AuthLayout({ authType }: Props) {
  const isRegister = authType === "Register";

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-linear-to-br from-brand-700/50 via-slate-950 to-blue-900/40" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />

        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-blue-600">
              <Activity className="h-5 w-5 text-white" />
            </span>

            <span className="text-lg font-semibold tracking-tight text-white">
              MediDecode
            </span>
          </Link>
        </div>

        <div className="relative max-w-md animate-fade-up">
          <h2 className="text-[2.6rem] font-semibold leading-[1.1] tracking-tight text-white">
            {isRegister
              ? "Start understanding your health"
              : "Welcome back to your health record"}
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
            {isRegister
              ? "Create an account to upload lab reports, get organ by organ explanations and track how your results change."
              : "Sign in to pick up where you left off, review past reports and compare your latest results."}
          </p>

          <ul className="mt-10 space-y-5">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.title}
                  className="flex animate-fade-up gap-4"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-brand-200 backdrop-blur">
                    <Icon size={19} />
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">
          © {new Date().getFullYear()} MediDecode · Educational summaries, not
          medical advice.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col bg-white">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-brand-500 to-blue-600">
              <Activity className="h-4 w-4 text-white" />
            </span>

            <span className="text-sm font-semibold text-slate-900">
              MediDecode
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-start justify-center px-5 pb-10 sm:px-8 lg:items-center">
          <div className="w-full max-w-sm animate-fade-up">
            {/* The brand panel is desktop only, so mobile gets a short
                version of the same message above the form. */}
            <div className="mb-7 lg:hidden">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                {isRegister
                  ? "Start understanding your health"
                  : "Welcome back to your health record"}
              </h2>

              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {highlights.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center gap-1.5 text-xs text-slate-500"
                  >
                    <item.icon size={14} className="text-brand-600" />
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>

            {isRegister ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      </main>
    </div>
  );
}
