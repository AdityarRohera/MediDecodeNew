import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/common/NavBar";
import Reveal from "@/components/common/Reveal";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import ReportComparison from "@/components/LandingPage/ReportComparison";
import Pricing from "@/components/LandingPage/Pricing";
import Footer from "@/components/LandingPage/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <ReportComparison />
        <Pricing />

        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-7 py-14 text-center sm:px-12">
                <div className="absolute inset-0 bg-linear-to-br from-brand-700/50 via-slate-950 to-blue-900/40" />
                <div className="absolute inset-0 bg-grid opacity-[0.12]" />

                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Your next lab report does not have to be a mystery
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    Create an account, upload a report and get the full
                    breakdown in under a minute.
                  </p>

                  <Link
                    href="/auth/register"
                    className="group mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 active:scale-[0.98]"
                  >
                    Create free account
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
