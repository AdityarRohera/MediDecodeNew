"use client"

import { useRouter } from "next/navigation";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


interface Props {
  authType: "Login" | "Register";
}

function AuthLayout({ authType }: Props) {

    const router = useRouter();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex flex-col justify-between">

      {/* Logo */}

      <div className="flex items-center justify-between p-8">
        <h1 className="text-3xl font-bold text-blue-600">
          MediDecode
        </h1>

        <p className="text-gray-500">
          Understand. Analyze. Improve.
        </p>
      </div>

      {/* Main Section */}

      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-20 px-10">

        {/* Left */}

        <div className="flex-1 space-y-8">

          <div>

            <h2 className="text-6xl font-bold leading-tight">

              {
                authType === "Register"
                  ? (
                    <>
                      Create Your
                      <br />
                      <span className="text-blue-600">
                        MediDecode
                      </span>
                      <br />
                      Account
                    </>
                  )
                  : (
                    <>
                      Welcome Back
                      <br />
                      to
                      <br />
                      <span className="text-blue-600">
                        MediDecode
                      </span>
                    </>
                  )
              }

            </h2>

            <p className="mt-6 text-gray-600 text-lg max-w-md">

              {
                authType === "Register"
                  ? "Join thousands of users who trust MediDecode to understand their health better."
                  : "Sign in to your account and continue your health journey."
              }

            </p>

          </div>

          <div className="space-y-6">

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                🛡️
              </div>

              <div>
                <h3 className="font-semibold">
                  Secure & Private
                </h3>

                <p className="text-gray-500">
                  Your data stays encrypted.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                🧠
              </div>

              <div>
                <h3 className="font-semibold">
                  AI Powered
                </h3>

                <p className="text-gray-500">
                  Understand reports easily.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                📈
              </div>

              <div>
                <h3 className="font-semibold">
                  Track Health
                </h3>

                <p className="text-gray-500">
                  Monitor trends over time.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="w-130 bg-white rounded-3xl shadow-xl p-10">

          {
            authType === "Register"
              ? <RegisterForm />
              : <LoginForm />
          }

        </div>

      </div>

      {/* Footer */}

      <div className="p-8 flex justify-between text-gray-500">

        <p>
          © 2026 MediDecode
        </p>

        {
          authType === "Register"
            ? (
              <p>
                Already have an account?
                <span onClick={() => router.push('/auth/login')} className="text-blue-600 cursor-pointer ml-2">
                  Sign In
                </span>
              </p>
            )
            : (
              <p>
                Don't have an account?
                <span className="text-blue-600 cursor-pointer ml-2">
                  Sign Up
                </span>
              </p>
            )
        }

      </div>

    </div>
  );
}

export default AuthLayout;