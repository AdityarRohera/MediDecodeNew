

import {
  Brain,
  Shield,
  Heart,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Powered Analysis",
    desc: "Upload reports and receive instant explanations."
  },
  {
    icon: CheckCircle,
    title: "Human Friendly Language",
    desc: "No medical jargon."
  },
  {
    icon: Shield,
    title: "Health Risk Detection",
    desc: "Identify abnormal results."
  },
  {
    icon: Heart,
    title: "Actionable Recommendations",
    desc: "Get practical health suggestions."
  }
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose MediDecode?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-8 text-center"
            >
              <item.icon
                className="mx-auto text-blue-600"
                size={40}
              />

              <h3 className="font-bold mt-4">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}