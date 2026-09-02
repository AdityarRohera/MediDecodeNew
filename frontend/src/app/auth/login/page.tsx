import type { Metadata } from "next";
import AuthLayout from "@/components/Authentication/AuthLayout";

export const metadata: Metadata = {
  title: "Sign in · MediDecode",
};

export default function LoginPage() {
  return <AuthLayout authType="Login" />;
}
