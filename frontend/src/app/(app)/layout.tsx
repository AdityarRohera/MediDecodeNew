import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import { getCurrentUser } from "@/services/operations/user/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  let user = null;

  try {
    const response = await getCurrentUser(cookieStore.toString());

    user = response?.user ?? null;
  } catch (error) {
    console.log("-------Error comes in app layout-------", error);
  }

  // Everything under this layout needs a signed in user.
  if (!user) {
    redirect("/auth/login");
  }

  return <AppShell serverUser={user}>{children}</AppShell>;
}
