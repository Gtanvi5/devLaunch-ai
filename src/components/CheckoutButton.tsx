"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

type RazorpayOptions = {
  key?: string | undefined;
  subscription_id?: string;
  name?: string;
  description?: string;
  handler?: (response: {
    razorpay_payment_id?: string;
    razorpay_subscription_id?: string;
    razorpay_signature?: string;
  }) => void;
  theme?: { color?: string };
  [key: string]:
    | string
    | undefined
    | ((response: RazorpayPaymentResponse) => void)
    | { color?: string };
};

type RazorpayPaymentResponse = {
  razorpay_payment_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature?: string;
};

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
}

interface RazorpayPaymentFailedPayload {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

export default function CheckoutButton({ planId }: { planId: string }) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load Razorpay SDK. Check your connection.");
        return;
      }

      const response = await fetch("/api/subscription/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create subscription");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.subscriptionId,
        customer_id: data.customerId,
        name: "Your App Name",
        description: "Pro Plan Subscription",
        handler: async function () {
          alert("Payment successful! Your account is being upgraded.");
          await user?.reload();
          window.location.href = "/pro-tools";
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const RazorpayCtor = window.Razorpay as RazorpayConstructor | undefined;
      if (!RazorpayCtor) {
        alert("Razorpay SDK not available. Please try again later.");
        return;
      }

      const razorpayInstance = new RazorpayCtor(options);

      razorpayInstance.on("payment.failed", function (response: unknown) {
        const failedResponse = response as RazorpayPaymentFailedPayload;
        console.error("Payment failed:", failedResponse.error?.description);
        alert("Payment failed. Please try again.");
      });

      razorpayInstance.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong initializing the checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm flex items-center justify-center gap-2"
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {isLoading ? "Processing..." : "Upgrade to Pro"}
    </button>
  );
}
