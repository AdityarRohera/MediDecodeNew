import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LandingPage from "@/components/LandingPage/LandingPage";

export default async function Home() {
  const cookieStore = await cookies();

  // A signed in visitor goes straight to their reports.
  if (cookieStore.get("token")) {
    redirect("/reports");
  }

  return <LandingPage />;
}
