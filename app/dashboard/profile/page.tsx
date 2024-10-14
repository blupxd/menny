import GradientLink from "@/components/GradientLink";
import ManageSubscription from "@/components/ManageSubscription";
import ProfilePage from "@/components/ProfilePage";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/subscriptions";
import { Stars } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const { isPro, plan, isCanceled, currentPeriodEnd, updatePaymentMethodURL } =
    await getUserSubscriptionPlan(session?.user.id + "");
  return (
    <div className="pt-20 px-4 pb-10 md:p-6 flex flex-col relative min-h-screen">
      <div className="z-10 flex flex-col">
        <ProfilePage userData={session?.user} />
        <Separator className="my-4" />
        <div className="flex lg:items-center lg:flex-row flex-col lg:space-x-24">
          <div className="flex flex-col mt-4">
            <h1 className="text-sm font-semibold text-purple-300">
              Subscriptions and payment
            </h1>
            <p className="text-xs font-light">
              Change, cancel or resume your subscription plan and payment
              information
            </p>
          </div>
          {isPro ? (
            <ManageSubscription
              plan={plan}
              updatePaymentMethodURL={updatePaymentMethodURL}
              userId={session?.user.id + ""}
              isCanceled={isCanceled}
              currentPeriodEnd={currentPeriodEnd}
            />
          ) : (
            <GradientLink
              href="/pricing"
              className="max-w-max mt-4 flex items-center py-2 font-normal"
            >
              Subscribe <Stars className="w-4 h-4 ml-2" />
            </GradientLink>
          )}
        </div>
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
