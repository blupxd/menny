import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import rawBody from "raw-body";
import crypto from "crypto";
import { Readable } from "stream";
import { db } from "@/lib/db";


export async function POST(request: NextRequest) {
  try {
    // Extract and parse the request body
    const body = await rawBody(
      Readable.from(Buffer.from(await request.text()))
    );
    const headersList = headers();

    // Get signature from the headers
    const sigString = headersList.get("x-signature");
    if (!sigString) {
      return NextResponse.json(
        { message: "No signature provided" },
        { status: 403 }
      );
    }

    // Parse payload from body
    const payload = JSON.parse(body.toString());

    // Verify signature
    const secret = process.env.LEMONSQUEEZY_SIGNATURE_SECRET as string;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
    const signature = Buffer.from(
      Array.isArray(sigString) ? sigString.join("") : sigString || "",
      "utf8"
    );

    // Validate signature
    if (!crypto.timingSafeEqual(digest, signature)) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 403 }
      );
    }

    // Extract subscription ID and user ID
    const subscriptionId = payload.data?.id;
    const userId = payload.meta?.custom_data?.user_id;

    if (!userId || !subscriptionId) {
      return NextResponse.json(
        { message: "Invalid data: userId or subscriptionId missing" },
        { status: 400 }
      );
    }

    // Fetch the subscription details from Lemon Squeezy
    const getSubscription = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
      }
    );

    // Check if the subscription fetch was successful
    if (!getSubscription.ok) {
      const errorText = await getSubscription.text();
      console.error("Error fetching subscription:", errorText);
      return NextResponse.json(
        {
          message: "Subscription not found",
          error: errorText,
          status: getSubscription.status,
        },
        { status: getSubscription.status }
      );
    }

    switch (payload.meta.event_name) {
      case "subscription_created": {
        const subscription = await getSubscription.json();
        await db.user.update({
          where: { id: userId },
          data: {
            subscriptionId: `${subscription.data.id}`,
            planExpires: subscription.data.attributes.renews_at,
            plan: subscription.data.attributes.product_name.toLowerCase(),
          },
        });
        
        return NextResponse.json({ message: "Success!" }, { status: 200 });
      }
      case "subscription_updated": {
        const subscription = await getSubscription.json();
        const user = await db.user.findUnique({
          where: {
            subscriptionId: `${subscription.data.id}`,
          },
          select: { subscriptionId: true },
        });
        if (!user || !user.subscriptionId) return;

        await db.user.update({
          where: {
            subscriptionId: user.subscriptionId,
          },
          data: {
            planExpires: subscription.data.attributes.renews_at,
            plan: subscription.data.attributes.product_name.toLowerCase(),
          },
        });
        return NextResponse.json({ message: "Success!" }, { status: 200 });
      }
      // Add any additional logic for subscription creation here

      // You can add other cases for different webhook events if needed
      default:
        console.log("Unhandled event:", payload.meta.event_name);
    }

    // Return a success response
    return NextResponse.json(
      { message: "Webhook received successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
