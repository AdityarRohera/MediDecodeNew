"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, TriangleAlert } from "lucide-react";

import { signin } from "@/services/operations/user/auth";
import { useAuth } from "@/context/AuthContext";

export const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100";

export default function LoginForm() {
  const router = useRouter();
  const { fetchUser } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signin(formData);

      await fetchUser();

      // Straight into the reports list, with a welcome note.
      router.push("/reports?welcome=1");
      router.refresh();
    } catch (err: any) {
      console.log("Error comes in LoginForm Submit Handler", err);

      setError(err?.message || "We could not sign you in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Sign in
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Welcome back. Enter your details to continue.
        </p>
      </div>

      {error && (
        <div className="flex animate-fade-down items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
          <TriangleAlert size={17} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <div className="relative">
          <Lock
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter your password"
            className={inputClass}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Loader2 size={17} className="animate-spin" />}
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-slate-500">
        New to MediDecode?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-brand-700 transition hover:text-brand-800"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
