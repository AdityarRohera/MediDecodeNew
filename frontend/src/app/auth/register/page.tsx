import type { Metadata } from "next";
import AuthLayout from "@/components/Authentication/AuthLayout";

export const metadata: Metadata = {
  title: "Create account · MediDecode",
};

export default function RegisterPage() {
  return <AuthLayout authType="Register" />;
}
