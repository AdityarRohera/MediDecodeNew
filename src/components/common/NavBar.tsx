

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-600">
          MediDecode
        </h2>

        <div className="hidden md:flex gap-8">
          <Link href="#">Features</Link>
          <Link href="#">How It Works</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Testimonials</Link>
          <Link href="#">About</Link>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-2 border rounded-lg">
            Login
          </button>

          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}