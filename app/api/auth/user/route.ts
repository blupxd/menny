import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userSchema = z.object({
      name: z.string().min(1, { message: "This field has to be filled." }),
      lastname: z.string().min(1, { message: "This field has to be filled." }),
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      password: z.string().min(1, { message: "You must enter your password" }),
      terms: z.boolean().refine((val) => val === true, {
        message: "Please read and accept the terms and conditions",
      }),
    });

    const { email, password, name, lastname, terms } = userSchema.parse(body);
    console.log("Checking for existing user with email:", email);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    console.log("Existing user found:", existingUserByEmail);

    // Check if any user exists with the given email
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastname,
        terms,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error details:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred!" },
      { status: 500 }
    );
  }
}
