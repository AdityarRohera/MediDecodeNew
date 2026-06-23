
import Hero from "@/components/LandingPage/Hero";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Navbar from "@/components/common/NavBar";
import Features from "@/components/LandingPage/Features";
import ReportComparison from "@/components/LandingPage/ReportComparison";
import Pricing from "@/components/LandingPage/Pricing";
import Footer from "@/components/LandingPage/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ReportComparison />
      <Pricing />
      <Footer />
    </div>
  );
}
