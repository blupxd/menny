"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import GradientButton from "./GradientButton";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ManageSubscription(props: {
  userId: string;
  isCanceled: boolean;
  plan: string;
  currentPeriodEnd?: Date | null;
  updatePaymentMethodURL: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { userId, plan, isCanceled, currentPeriodEnd, updatePaymentMethodURL } =
    props;
  const router = useRouter();
  // If the subscription is cancelled, let the user resume his plan
  if (isCanceled && currentPeriodEnd) {
    const handleResumeSubscription = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/payments/resume-subscription", {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
          }),
        });
        if (response.ok) setLoading(false);
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="flex flex-col mt-4 lg:mt-0 space-y-4">
        <p className="text-sm">
          Your plan is canceled, but you have our services until{" "}
          <span className="text-purple-400 font-semibold italic">
            {format(currentPeriodEnd!, "d. MMMM yyyy. HH:mm")}
          </span>
        </p>
        <GradientButton
          className="max-w-max font-normal"
          disabled={loading}
          onClick={handleResumeSubscription}
        >
          Resume plan{" "}
          {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
        </GradientButton>
      </div>
    );
  }

  // If the user is subscribed, let him cancel his plan
  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/cancel-subscription", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
        }),
      });
      if(response.ok) setLoading(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-col md:mb-0 mb-4">
        <h1 className="text-base">Your plan:</h1>
        <p className="text-lg font-black bg-gradient-to-br from-gray-300 to-purple-300 bg-clip-text text-transparent">
          {plan.charAt(0).toUpperCase() + plan.slice(1)} plan
        </p>

        <p className="text-sm text-purple-400">
          Plan expires{" "}
          <span className="font-semibold italic">
            {format(currentPeriodEnd!, "d. MMMM yyyy. HH:mm")}
          </span>
        </p>
      </div>
      <div className="flex items-center mt-4 space-x-4">
        <Button disabled={loading} variant="outline" onClick={handleCancelSubscription}>
          Cancel your plan {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonVariants({ variant: "default" })}`}
          href={updatePaymentMethodURL}
        >
          Update payment method
        </Link>
      </div>
    </div>
  );
}
