import ManageSubscription from "@/components/ManageSubscription";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const { isPro, isCanceled, currentPeriodEnd, updatePaymentMethodURL } =
    await getUserSubscriptionPlan(session?.user.id + "");
  return (
    <div className="p-6 flex flex-col">
      <h1>Profile page</h1>
      {isPro ? (
        <ManageSubscription
          updatePaymentMethodURL={updatePaymentMethodURL}
          userId={session?.user.id + ""}
          isCanceled={isCanceled}
          currentPeriodEnd={currentPeriodEnd}
        />
      ) : (
        <Link
          href="/pricing"
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Upgrade your plan
        </Link>
      )}
    </div>
  );
};

export default page;
