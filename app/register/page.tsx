import RegisterForm from '@/components/forms/RegisterForm'
import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex m-10 items-center justify-center">
      <div className="border p-10 max-h-max mx-auto flex flex-col">
        <h1 className="text-3xl font-bold ">
          Register
        </h1>
        <h2 className="font-thin text-sm mb-4">
          Create your account to access our features
        </h2>
        <RegisterForm />
        <div className="flex justify-center text-xs mt-4 items-center gap-2 font-light">
          <p>You already have an account?</p>
          <Link
            href="/login"
            className="text-orange-500 underline font-semibold"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage