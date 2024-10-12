// lib/menuLeft.ts
import { authOptions } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";
import { getServerSession } from "next-auth";

// Helper function to get menu limits
const getMenuLimitMessage = (plan: string | undefined) => {
  switch (plan) {
    case "free":
      return "You have 1 menu available to create";
    case "standard":
      return "You have 3 menus available to create";
    case "premium":
      return "You have 5 menus available to create";
    default:
      return "You have 1 menu available to create";
  }
};

// Main function to get session and subscription details
export const getMenuLeft = async () => {
  const session = await getServerSession(authOptions);
  const subscription = session
    ? await getUserSubscriptionPlan(session.user.id + "")
    : null;

  const message = getMenuLimitMessage(subscription?.plan);
  return message;
};
