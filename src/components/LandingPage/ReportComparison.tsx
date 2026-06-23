
export default function ReportComparison() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-4xl font-bold mb-12">
          See The Difference
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="border rounded-2xl p-6">
            <h3 className="font-bold">
              Original Report
            </h3>

            <p className="mt-4 text-gray-600">
              ALT (SGPT): 78 U/L
            </p>
          </div>

          <div className="border rounded-2xl p-6 bg-green-50">
            <h3 className="font-bold text-green-700">
              MediDecode Explanation
            </h3>

            <p className="mt-4">
              Your liver is slightly above normal.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h3 className="font-bold">
              Recommendations
            </h3>

            <ul className="mt-4 space-y-2">
              <li>✓ Reduce alcohol</li>
              <li>✓ Exercise regularly</li>
              <li>✓ Consult physician</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}