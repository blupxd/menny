import { db } from "@/lib/db";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        subscriptionId: true,
        planExpires: true,
        plan: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    const { isPro } = await getUserSubscriptionPlan(user.id);
    if (!isPro)
      return NextResponse.json(
        { message: "You are not subscribed" },
        { status: 402 }
      );

    await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${user.subscriptionId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: "subscriptions",
            id: user.subscriptionId,
            attributes: {
              cancelled: false,
            },
          },
        }),
      }
    );
    return NextResponse.json({
      message: "You have successfuly resumed your subscription."
    });
  } catch (error) {
    console.log({error})
    return NextResponse.json({message: error}, {status: 500})
  }
}
