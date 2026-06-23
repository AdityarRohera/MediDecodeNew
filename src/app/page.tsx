
import { redirect } from 'next/navigation';
import LandingPage from "@/components/LandingPage/LandingPage";
import { cookies } from "next/headers";


export default async function Home() {

  const cookie = await cookies();
  const token = cookie.get('token');

  if(token){
    redirect('/dashboard');
  }

  return(
    <LandingPage/>
  )

}
