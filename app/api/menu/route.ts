import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as z from "zod";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized", status: 400 });
    }
    const userId = session.user?.id;
    const menus = await db.menu.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(menus, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return NextResponse.json({ message: "Unauthorized", status: 400 });
    }
    const body = await req.json();
    const { id } = body;
    const userId = session.user?.id;
    await db.menu.delete({
      where: {
        userId: userId,
        id,
      },
    });
    return NextResponse.json(
      { message: "Successfully deleted" },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  try {
    const menuSchema = z.object({
      menuName: z.string().min(3, { message: "This field has to be filled." }),
    });
    const body = await req.json();
    const { menuName } = menuSchema.parse(body);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized", status: 400 });
    }
    const userId = session.user?.id;
    console.log(userId);
    const newMenu = await db.menu.create({
      data: {
        menuName,
        user: {
          connect: { id: userId },
        },
      },
    });
    return NextResponse.json(
      {
        menu: newMenu,
        message: "Successfully created new menu!",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
