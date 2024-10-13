import ManageSubscription from "@/components/ManageSubscription";
import ProfilePage from "@/components/ProfilePage";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const { isPro, isCanceled, currentPeriodEnd, updatePaymentMethodURL } =
    await getUserSubscriptionPlan(session?.user.id + "");
  return (
    <div className="pt-20 px-4 pb-4 md:p-6 flex flex-col relative h-screen">
      <div className="z-10 flex flex-col">
        <ProfilePage userData={session?.user} />
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
      <Image
        src="/assets/background.jpg"
        alt="bg"
        unoptimized
        fill
        className="object-cover opacity-30"
      />
    </div>
  );
};

export default page;
