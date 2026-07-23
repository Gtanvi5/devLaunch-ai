"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Receipt,
  Download,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

// Mock Data
const invoices = [
  { id: "INV-2026-007", date: "Jul 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$49.00", status: "Paid" },
];

export default function BillingSettingsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-4 md:p-8 pt-24 md:pt-8 lg:pl-72">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Billing & Subscription
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your plan, payment methods, and download past invoices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" /> Pro Plan
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Active
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                  $49
                </span>
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {" "}
                  / month
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Up to 5 team members",
                  "10,000 API requests/mo",
                  "Priority email support",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-500" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm">
                Upgrade to Enterprise
              </button>
              <p className="text-xs text-center text-zinc-500">
                Your plan renews on{" "}
                <span className="font-medium text-zinc-900 dark:text-white">
                  August 1, 2026
                </span>
                .
              </p>
            </div>
          </motion.div>

          {/* Payment Method Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <CreditCard className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Payment Method
                </h2>
                <p className="text-xs text-zinc-500">Primary card on file</p>
              </div>
            </div>

            {/* Simulated Credit Card */}
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2xl p-6 text-white overflow-hidden mb-6 flex-grow">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <CreditCard className="w-24 h-24 -mr-6 -mt-6" />
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="text-lg font-bold tracking-widest mb-6">
                  VISA
                </div>
                <div>
                  <p className="text-zinc-400 text-xs mb-1 uppercase tracking-wider">
                    Card Number
                  </p>
                  <p className="font-mono text-lg tracking-widest mb-4">
                    **** **** **** 4242
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-zinc-400 text-xs mb-1 uppercase tracking-wider">
                        Expiry
                      </p>
                      <p className="font-mono text-sm">12 / 28</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs mb-1 uppercase tracking-wider">
                        CVC
                      </p>
                      <p className="font-mono text-sm">***</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Secure via
                Stripe
              </div>
              <button className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">
                Update Card
              </button>
            </div>
          </motion.div>
        </div>

        {/* Billing History Table */}
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
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Billing History
              </h2>
              <p className="text-xs text-zinc-500">
                Past invoices and receipts
              </p>
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
                {invoices.map((invoice, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-300">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{invoice.date}</td>
                    <td className="px-6 py-4 text-zinc-900 dark:text-white">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        PDF <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Danger Zone / Cancel Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center pt-4"
        >
          <button className="text-sm font-medium text-zinc-500 hover:text-red-600 dark:hover:text-red-500 transition-colors flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Cancel Subscription
          </button>
        </motion.div>
      </div>
    </main>
  );
}
