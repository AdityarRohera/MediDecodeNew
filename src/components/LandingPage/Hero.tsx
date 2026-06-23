

import { FileText, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-linear-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h1 className="text-6xl font-bold leading-tight">
            Understand
            <span className="text-blue-600">
              {" "}Medical Reports
            </span>
            <br />
            Without Medical Knowledge
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Upload lab reports, blood tests and health records.
            Get easy-to-understand AI explanations instantly.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 text-white px-7 py-4 rounded-xl">
              Analyze My Report
            </button>

            <button className="border px-7 py-4 rounded-xl">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white shadow-lg rounded-2xl p-5">
            <FileText className="text-blue-600" />
            <h3 className="font-semibold mt-2">
              Lab Report PDF
            </h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-5">
            <Sparkles className="text-green-600" />
            <h3 className="font-semibold mt-2">
              AI Processing
            </h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-5">
            <h3 className="font-semibold">
              Simple Explanation
            </h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-5">
            <h3 className="font-semibold">
              Health Recommendations
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}