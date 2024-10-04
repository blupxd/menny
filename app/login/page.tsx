import LoginForm from "@/components/forms/LoginForm";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-10 w-96 max-h-max mx-auto flex flex-col">
        <h1 className="text-3xl font-bold ">
          Welcome to <span className="text-orange-500">Menny</span>
        </h1>
        <h2 className="font-thin text-sm mb-4">
          Please Login to proceed to your account
        </h2>
        <LoginForm />
        <div className="flex flex-col items-center">
          <h1 className="text-sm text-center my-2">Or</h1>
          <GoogleSignInButton>Sign in with google</GoogleSignInButton>
        </div>
        <div className="flex justify-center text-xs mt-4 items-center gap-2 font-light">
          <p>Don't have an account?</p>
          <Link
            href="/register"
            className="text-orange-500 underline font-semibold"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
