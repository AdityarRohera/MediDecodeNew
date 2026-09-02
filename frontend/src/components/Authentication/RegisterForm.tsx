"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  TriangleAlert,
  User,
} from "lucide-react";

import { register, signin } from "@/services/operations/user/auth";
import { useAuth } from "@/context/AuthContext";
import { inputClass } from "./LoginForm";

export default function RegisterForm() {
  const router = useRouter();
  const { fetchUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validate = () => {
    if (!formData.name.trim()) return "Please enter your full name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";
    if (!accepted) return "Please accept the terms to continue.";

    return "";
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = validate();

    if (message) {
      setError(message);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { confirmPassword, ...dataToSend } = formData;

      await register(dataToSend);

      /*
          Signing in right away keeps the new user in one flow
          instead of bouncing them back to the login screen.
      */
      try {
        await signin({
          email: formData.email,
          password: formData.password,
        });

        await fetchUser();

        router.push("/reports?welcome=1");
        router.refresh();
      } catch {
        router.push("/auth/login");
      }
    } catch (err: any) {
      console.log("Error comes in RegisterForm Submit Handler", err);

      setError(
        err?.message || "We could not create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Create your account
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Free to start. No card required.
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
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Full name
        </label>

        <div className="relative">
          <User
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
      </div>

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

      <div className="space-y-4">
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
              autoComplete="new-password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Min. 6 characters"
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Confirm password
          </label>

          <div className="relative">
            <Lock
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Repeat password"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => {
            setAccepted(e.target.checked);
            setError("");
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
        />

        <span>
          I agree to the terms of service and privacy policy, and understand
          MediDecode does not replace medical advice.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Loader2 size={17} className="animate-spin" />}
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-brand-700 transition hover:text-brand-800"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
