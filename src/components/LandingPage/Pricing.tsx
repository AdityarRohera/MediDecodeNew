
export default function Pricing() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl text-center font-bold mb-14">
          Simple Pricing
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="border rounded-2xl p-8 bg-white">
            <h3 className="font-bold text-2xl">
              Free
            </h3>

            <p className="text-5xl font-bold mt-5">
              ₹0
            </p>

            <button className="w-full mt-8 border py-3 rounded-xl">
              Get Started
            </button>
          </div>

          <div className="border-2 border-blue-600 rounded-2xl p-8 bg-white">
            <h3 className="font-bold text-2xl">
              Pro
            </h3>

            <p className="text-5xl font-bold mt-5">
              ₹299
            </p>

            <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl">
              Upgrade
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}