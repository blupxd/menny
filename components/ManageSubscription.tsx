"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ManageSubscription(props: {
  userId: string;
  isCanceled: boolean;
  currentPeriodEnd?: number;
  updatePaymentMethodURL: string;
}) {
  const { userId, isCanceled, currentPeriodEnd, updatePaymentMethodURL } =
    props;
  const router = useRouter();

  // If the subscription is cancelled, let the user resume his plan
  if (isCanceled && currentPeriodEnd) {
    const handleResumeSubscription = async () => {
      try {
        await fetch("/api/payments/resume-subscription", {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
          }),
        });
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="flex flex-col justify-between items-center gap-4">
        <p>
          You have cancelled the subscription but you still have access to our
          service until {new Date(currentPeriodEnd).toDateString()}
        </p>
        <Button
          className="bg-blue-300 hover:bg-blue-500 w-full"
          onClick={handleResumeSubscription}
        >
          Resume plan
        </Button>
      </div>
    );
  }

  // If the user is subscribed, let him cancel his plan
  const handleCancelSubscription = async () => {
    try {
      await fetch("/api/payments/cancel-subscription", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
        }),
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center gap-4">
      <p>You are subscribed to our product. Congratulations</p>
      <Button
        className="bg-red-300 hover:bg-red-500 w-full"
        onClick={handleCancelSubscription}
      >
        Cancel your plan
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
  );
}
