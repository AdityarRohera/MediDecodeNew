import { getCurrentUser } from "@/services/operations/user/auth";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

export default async function page() {

  const cookieStore = await cookies();

  const user = await getCurrentUser(cookieStore);

  console.log("Geting user details -> " , user);

  if(!user){
    redirect('/auth/login');
  }
  
  return (
    <div>
      welcome to dashbaod
    </div>
  )
}
