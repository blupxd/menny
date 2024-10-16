import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userId = session.user.id;

    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (user) return NextResponse.json({ plan: user.plan }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

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
        provider: "credentials",
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const userSchema = z.object({
      name: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .optional(),
      lastname: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .optional(),
      email: z.string().email("This is not a valid email.").optional(),
      image: z.string().optional(), // Assuming profilePicture is a URL
    });

    // Parse and validate the request body
    const { name, lastname, email, image } = userSchema.parse(body);

    // Get the current user session
    const session = await getServerSession(authOptions);
    console.log(body);
    // Ensure the user is logged in
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Find the existing user
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the email already exists for a different user
    if (email && email !== existingUser.email) {
      const emailExists = await db.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json(
          { message: "This email is already in use by another user." },
          { status: 409 }
        );
      }
    }

    // Update user data
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: name || existingUser.name,
        lastname: lastname || existingUser.lastname,
        email: email || existingUser.email,
        image: image || existingUser.image,
      },
    });

    return NextResponse.json(
      { user: updatedUser, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
