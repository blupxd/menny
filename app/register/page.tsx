import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      <div className="bg-transparent min-h-screen flex py-10 flex-col px-4 md:px-24 justify-center w-full md:w-1/2 bg-gradient-to-tr shadow-lg shadow-black/50 z-10 from-purple-800/20 to-cyan-800/20">
        <Link href="/" className="mb-4 font-bold text-2xl">
          Menny
        </Link>
        <h1 className="text-3xl bg-gradient-to-b from-gray-300 to-purple-300 bg-clip-text text-transparent">
          Create account
        </h1>
        <h2 className="font-thin text-sm mb-4">
          Sign up today and create your menu today. With our tools create your
          menu in no time
        </h2>
        <RegisterForm />
        <div className="flex justify-center text-xs mt-4 items-center gap-2 font-light">
          <p>You already have an account?</p>
          <Link
            href="/login"
            className="text-purple-300 underline font-semibold"
          >
            Log in
          </Link>
        </div>
      </div>
      <Image
        src="/assets/loginbg.svg"
        width={1440}
        height={1080}
        alt="background"
        className="w-1/2 md:block hidden"
      />
    </div>
  );
};

export default RegisterPage;
