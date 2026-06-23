
"use client"
import { register } from '@/services/operations/user/auth';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

function RegisterForm() {

    const router = useRouter();

    const[formData , setFormData] = useState({name : "" , email : "" , password : "" , confirmPassword : ""});
    const [loading , setLoading] = useState(false);

    const changeHandler = (e : any) => {

        const {name , value} = e.target;

        setFormData((prev : any) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const submitHandler = async() => {
        try{

            setLoading(true);

            // validation
            if(formData.password !== formData.confirmPassword) alert("Password not match with confirm password")

            const { confirmPassword, ...dataToSend } = formData;
            const res = await register(dataToSend);

            // toast message

            // redirect
            router.push('/auth/login');

        } catch(err) {
            console.log("Error comes in RegisterForm Submit Handler" , err);

        } finally{
            setLoading(false);
        }
    }


  return (
  <div className="space-y-6">

    <div>
      <h2 className="text-5xl font-bold text-slate-900">
        Sign Up
      </h2>

      <p className="mt-2 text-slate-500">
        Create your account to get started
      </p>
    </div>

    <div>

      <label className="block mb-2 text-sm font-semibold text-slate-700">
        Full Name
      </label>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={changeHandler}
        placeholder="Enter your full name"
        className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
      />

    </div>

    <div>

      <label className="block mb-2 text-sm font-semibold text-slate-700">
        Email Address
      </label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={changeHandler}
        placeholder="Enter your email address"
        className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
      />

    </div>

    <div>

      <label className="block mb-2 text-sm font-semibold text-slate-700">
        Password
      </label>

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={changeHandler}
        placeholder="Create a password"
        className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
      />

    </div>

    <div>

      <label className="block mb-2 text-sm font-semibold text-slate-700">
        Confirm Password
      </label>

      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={changeHandler}
        placeholder="Confirm your password"
        className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
      />

    </div>

    <div className="flex gap-3 text-sm text-slate-500">
      <input type="checkbox" />
      <p>
        I agree to the
        <span className="text-blue-600 cursor-pointer">
          {" "}Terms of Service
        </span>
        {" "}and{" "}
        <span className="text-blue-600 cursor-pointer">
          Privacy Policy
        </span>
      </p>
    </div>

    <button
      onClick={submitHandler}
      disabled={loading}
      className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
    >
      {loading ? "Creating..." : "Create Account"}
    </button>

    <div className="flex items-center gap-4">
      <div className="h-[1px] flex-1 bg-slate-200"></div>
      <span className="text-sm text-slate-400">
        or continue with
      </span>
      <div className="h-[1px] flex-1 bg-slate-200"></div>
    </div>

    <div className="grid grid-cols-2 gap-4">

      <button className="border border-slate-200 rounded-xl py-3 font-medium hover:bg-slate-50 transition">
        Google
      </button>

      <button className="border border-slate-200 rounded-xl py-3 font-medium hover:bg-slate-50 transition">
        Apple
      </button>

    </div>

  </div>
)
}

export default RegisterForm;
