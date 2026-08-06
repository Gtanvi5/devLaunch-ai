"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  CreditCard,
  Receipt,
  Download,
  Zap,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Loader2,
  Clock,
} from "lucide-react";

import CheckoutButton from "@/components/CheckoutButton";

type Invoice = {
  id: string;
  date: number;
  amount: number;
  currency: string;
  status: string;
  pdfUrl: string;
};

type BillingData = {
  hasSubscription: boolean;
  subscription: {
    id: string;
    status: string;
    currentPeriodEnd: number;
    planName: string;
    amount: number;
    currency?: string;
    features: string[];
  } | null;
  paymentMethod: {
    last4: string;
    brand: string;
  } | null;
  invoices: Invoice[];
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export default function BillingTab() {
  const { data, error, isLoading, mutate } = useSWR<BillingData>(
    "/api/billing",
    fetcher,
  );

  const [isCancelling, setIsCancelling] = useState(false);

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(timestamp));
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center text-red-500 bg-red-50 dark:bg-red-500/10 rounded-3xl">
        Could not load billing information.
      </div>
    );
  }

  const isPro = data?.subscription?.planName?.toLowerCase().includes("pro");

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) return;

    setIsCancelling(true);
    try {
      const res = await fetch("/api/subscription", { method: "POST" });
      if (!res.ok) throw new Error("Failed to cancel subscription");
      await mutate();
      alert("Subscription cancelled successfully.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong cancelling your subscription.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Billing & Subscription
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your plan, payment methods, and download past invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {isPro && <Zap className="w-3.5 h-3.5" />}
                {data?.subscription?.planName || "Free Plan"}
              </div>

              <span
                className={`text-sm font-medium flex items-center gap-1.5 ${
                  data?.subscription?.status === "active"
                    ? "text-green-600 dark:text-green-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {data?.subscription?.status === "active" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Active
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" /> Inactive
                  </>
                )}
              </span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                {data?.subscription
                  ? formatCurrency(
                      data.subscription.amount,
                      data.subscription.currency || "USD",
                    )
                  : "$0"}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                {" "}
                / month
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {data?.subscription?.features?.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            {data?.subscription?.status === "active" ? (
              <button
                disabled
                className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed px-4 py-2.5 rounded-xl text-sm font-semibold"
              >
                Current Active Plan
              </button>
            ) : (
              <CheckoutButton planId="plan_TJFw6Pwg3cvA4u" />
            )}

            {data?.subscription?.currentPeriodEnd && (
              <p className="text-xs text-center text-zinc-500">
                Your plan renews on{" "}
                <span className="font-medium text-zinc-900 dark:text-white">
                  {formatDate(data.subscription.currentPeriodEnd)}
                </span>
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <CreditCard className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Payment Method
                </h3>
                <p className="text-xs text-zinc-500">Primary payment details</p>
              </div>
            </div>

            <div className="relative bg-linear-to-br from-zinc-800 to-zinc-950 rounded-2xl p-6 text-white overflow-hidden mb-6 grow min-h-40 flex flex-col justify-between">
              <div
                className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none"
                aria-hidden="true"
              >
                <CreditCard className="w-24 h-24 -mr-6 -mt-6" />
              </div>
              <span className="sr-only">Primary payment method</span>

              <div className="text-lg font-bold tracking-widest uppercase">
                {data?.paymentMethod?.brand || "CARD / UPI"}
              </div>
              <div>
                <p className="text-zinc-400 text-xs mb-1 uppercase tracking-wider">
                  Details securely stored
                </p>
                <p className="font-mono text-lg tracking-widest">
                  **** **** **** {data?.paymentMethod?.last4 || "0000"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-green-500" /> Secure via
              Razorpay
            </div>
            <button
              type="button"
              className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors"
            >
              Update Details
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm"
      >
        <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
            <Receipt className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Billing History
            </h3>
            <p className="text-xs text-zinc-500">Past invoices and receipts</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {data?.invoices?.map((invoice, idx) => {
                const isPaid = invoice.status.toLowerCase() === "paid";
                return (
                  <tr
                    key={invoice.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-300">
                      {invoice.id || `INV-${idx}`}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {formatDate(invoice.date)}
                    </td>
                    <td className="px-6 py-4 text-zinc-900 dark:text-white">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                          isPaid
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                        }`}
                      >
                        {isPaid ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {invoice.pdfUrl ? (
                        <a
                          href={invoice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          PDF <Download className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-zinc-400">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {(!data?.invoices || data.invoices.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {data?.subscription?.status === "active" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center pt-4"
        >
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCancelling}
            className={`text-sm font-medium transition-colors flex items-center gap-2 ${
              isCancelling
                ? "text-zinc-400 cursor-not-allowed"
                : "text-zinc-500 hover:text-red-600 dark:hover:text-red-500"
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            {isCancelling
              ? "Cancelling Subscription..."
              : "Cancel Subscription"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
