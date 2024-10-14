import { db } from "./db";

export async function getUserSubscriptionPlan(userId: string) {
  // Pronađi korisnika po ID-u
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionId: true,
      planExpires: true,
      plan: true,
    },
  });

  // Ako korisnik ne postoji, baci grešku
  if (!user) throw new Error("User not found");

  // Napravi zahteve ka Lemon Squeezy API-ju
  const getSubscription = await fetch(
    `https://api.lemonsqueezy.com/v1/subscriptions/${user.subscriptionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
    }
  );

  const subscriptionData = await getSubscription.json();
  const subscription = subscriptionData.data;

  // Provera da li je korisnik na Pro planu (Premium ili Lifetime)
  const isPro =
    (user.plan === "premium" || user.plan === "standard") &&
    user.planExpires &&
    new Date(user.planExpires).getTime() + 86_400_000 > Date.now();

  // Proveri da li je pretplata otkazana
  let isCanceled = false;

  if (user.subscriptionId && subscription) {
    isCanceled = subscription.attributes.cancelled;
  }

  // Vraćanje rezultata o korisniku i pretplati
  return {
    ...user,
    currentPeriodEnd: user.planExpires,
    isCanceled,
    isPro,
    updatePaymentMethodURL: subscription?.attributes.urls.update_payment_method,
  };
}
