import LoginForm from "@/components/forms/LoginForm";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      <div className="shadow-lg shadow-black/50 z-10 bg-transparent flex flex-col py-10 min-h-screen px-24 justify-center w-full md:w-1/2 bg-gradient-to-tr from-purple-800/20 to-cyan-800/20">
        <Link href="/" className="mb-4 font-bold text-2xl">
          Menny
        </Link>
        <h1 className="text-3xl bg-gradient-to-b from-gray-300 to-purple-300 bg-clip-text text-transparent">
          Login to your account
        </h1>
        <h2 className="font-thin text-sm mb-4">
          Please Login to proceed to your account
        </h2>
        <LoginForm />
        <div className="flex flex-col items-center">
          <h1 className="text-sm text-center my-2">Or</h1>
          <GoogleSignInButton>
            <Image
              src="/assets/google.png"
              width={15}
              height={15}
              alt="google"
              className="mr-2"
            />
            Continue with google
          </GoogleSignInButton>
        </div>
        <div className="flex justify-center text-xs mt-4 items-center gap-2 font-light">
          <p>Don&apos;t have an account?</p>
          <Link
            href="/register"
            className="text-purple-300 underline font-semibold"
          >
            Register here
          </Link>
        </div>
      </div>
      <Image
        src="/assets/loginbg.svg"
        width={1440}
        height={1080}
        alt="background"
        className="w-1/2"
      />
    </div>
  );
};

export default LoginPage;
