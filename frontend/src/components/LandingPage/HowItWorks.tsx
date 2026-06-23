
const steps = [
  "Upload Report",
  "AI Extracts Data",
  "Understand Results",
  "Improve Health"
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto flex items-center justify-center font-bold">
                {i + 1}
              </div>

              <h3 className="mt-4 font-semibold">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}