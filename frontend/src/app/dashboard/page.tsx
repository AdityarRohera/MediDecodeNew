import { getCurrentUser } from "@/services/operations/user/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  try {
    const cookieStore = await cookies();

    const user = await getCurrentUser(cookieStore.toString());

    if (!user) {
      redirect("/auth/login");
    }

    return (
      <div>
        Welcome {user.name}
      </div>
    );

  } catch (error) {
    console.error("Dashboard error:", error);

    return (
      <div>
        Something went wrong. Please try again.
      </div>
    );
  }
}