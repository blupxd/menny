import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, productId, storeId } = await request.json();

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Your account was not found" },
        { status: 404 }
      );
    }

    // Fetch the variant from Lemon Squeezy for the productId
    const variantResponse = await fetch(
      `https://api.lemonsqueezy.com/v1/variants?filter[product_id]=${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
      }
    );

    if (!variantResponse.ok) {
      const errorData = await variantResponse.json();
      return NextResponse.json(
        { message: "Failed to fetch variants", error: errorData },
        { status: variantResponse.status }
      );
    }

    const variantData = await variantResponse.json();
    const variantIdToUse = variantData.data?.[0]?.id;
    if (!variantIdToUse) {
      return NextResponse.json(
        { message: "No variants found for this store" },
        { status: 404 }
      );
    }

    // Create a checkout session with Lemon Squeezy
    const checkoutResponse = await fetch(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json", // Ensure JSON content type is set
          Accept: "application/vnd.api+json", // Also ensure the Accept header
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                email: user.email,
                custom: {
                  user_id: user.id,
                },
              },
            },
            relationships: {
              store: { data: { type: "stores", id: storeId + "" } },
              variant: { data: { type: "variants", id: variantIdToUse + "" } },
            },
          },
        }),
      }
    );

    if (!checkoutResponse.ok) {
      const errorData = await checkoutResponse.json();
      return NextResponse.json(
        { message: "Failed to create checkout", error: errorData },
        { status: checkoutResponse.status }
      );
    }

    const checkoutData = await checkoutResponse.json();
    console.log(checkoutData);
    // Return the checkout URL to the frontend
    return NextResponse.json(
      { checkoutURL: checkoutData.data.attributes.url },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("Error creating checkout:", err);
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if(!session || !session.user) return NextResponse.json({message:"Unauthorized"}, {status:401})

    try {
      const userId = session.user.id
      const subscriptionPlan = await getUserSubscriptionPlan(userId)
      return NextResponse.json({subscriptionPlan}, {status:200})
    } catch (error) {
      return NextResponse.json({message:"An error occured"})
      
    }
}