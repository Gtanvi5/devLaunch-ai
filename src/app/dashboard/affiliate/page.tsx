"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  CheckCircle2,
  MousePointerClick,
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Gift,
  Inbox,
  Bug,
} from "lucide-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa6";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const metrics = [
  {
    label: "Total Clicks",
    value: "1,432",
    icon: MousePointerClick,
    trend: "+12.5%",
    positive: true,
  },
  {
    label: "Free Sign-ups",
    value: "104",
    icon: Users,
    trend: "+8.2%",
    positive: true,
  },
  {
    label: "Paid Customers",
    value: "12",
    icon: CreditCard,
    trend: "+2 this week",
    positive: true,
  },
  {
    label: "Pending Payout",
    value: "$450.00",
    icon: DollarSign,
    trend: "Available Aug 1st",
    positive: null,
  },
];

const chartData = [
  { date: "Jul 12", clicks: 120, signups: 4 },
  { date: "Jul 13", clicks: 180, signups: 7 },
  { date: "Jul 14", clicks: 150, signups: 5 },
  { date: "Jul 15", clicks: 290, signups: 12 },
  { date: "Jul 16", clicks: 310, signups: 15 },
  { date: "Jul 17", clicks: 250, signups: 9 },
  { date: "Jul 18", clicks: 420, signups: 22 },
];

const mockReferrals = [
  {
    user: "alex@*******.com",
    plan: "Pro Plan",
    status: "Active",
    date: "Jul 18, 2026",
    amount: "$9.80",
  },
  {
    user: "sarah@*******.com",
    plan: "Starter",
    status: "Active",
    date: "Jul 15, 2026",
    amount: "$3.80",
  },
  {
    user: "founder@*******.co",
    plan: "Enterprise",
    status: "Pending",
    date: "Jul 10, 2026",
    amount: "$39.80",
  },
  {
    user: "mike@*******.dev",
    plan: "Pro Plan",
    status: "Churned",
    date: "Jun 22, 2026",
    amount: "$0.00",
  },
];

export default function AffiliateDashboard({
  affiliateCode,
  payoutPending,
  referrals: initialReferrals,
  chartData,
}: AffiliateProps) {
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState(initialReferrals);

  const affiliateLink = `https://devlaunch.ai/?via=${affiliateCode}`;
  const shareText = "Get 20% off your first 3 months of DevLaunch AI! 🚀";

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(affiliateLink)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    affiliateLink,
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const toggleDebugData = () => {
    setReferrals((prev) => (prev.length > 0 ? [] : mockReferrals));
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-4 md:p-8 pt-24 md:pt-8 lg:pl-72 selection:bg-violet-500/30">
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-violet-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white shadow-lg shadow-violet-500/20 relative overflow-hidden"
        >
          <div className="relative z-10 md:w-2/3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <Gift className="w-4 h-4" /> Partner Program
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Give 20%, Get 20%
            </h1>
            <p className="text-violet-100 text-lg mb-8 max-w-xl">
              Earn a 20% recurring commission for every customer you refer to
              DevLaunch AI. Your friends get 20% off their first 3 months.
            </p>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex items-center gap-2 max-w-md">
              <input
                type="text"
                readOnly
                aria-label="Your unique affiliate link"
                value={affiliateLink}
                className="bg-transparent border-none text-white w-full px-3 focus:outline-none font-medium truncate"
              />
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-2 bg-white text-violet-700 hover:bg-violet-50 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-10 -bottom-20 w-64 h-64 bg-indigo-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <span className="text-sm font-medium text-zinc-500">
            Quick Share:
          </span>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <FaTwitter className="w-4 h-4" /> Twitter
          </a>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <FaLinkedin className="w-4 h-4" /> LinkedIn
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center border border-violet-100 dark:border-violet-500/20">
                  <metric.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                {metric.positive !== null && (
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      metric.positive
                        ? "text-green-600 dark:text-green-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {metric.positive && <TrendingUp className="w-3 h-3" />}
                    {metric.trend}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                {metric.label}
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {metric.value}
              </h3>
              {metric.positive === null && (
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                  {metric.trend}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
            Click Traffic
          </h2>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#52525B"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717A", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717A", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181B",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#C4B5FD" }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Recent Referrals
              </h2>
              <button
                onClick={toggleDebugData}
                className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-md text-xs font-medium transition-colors"
              >
                <Bug className="w-3 h-3" />
                Toggle Data
              </button>
            </div>
            {referrals.length > 0 && (
              <button className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 flex items-center gap-1 transition-colors">
                View all <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {referrals.length > 0 ? (
              <motion.div
                key="referrals-table"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400">
                    <tr>
                      <th className="px-6 py-4 font-medium">User</th>
                      <th className="px-6 py-4 font-medium">Plan</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Date Joined</th>
                      <th className="px-6 py-4 font-medium text-right">
                        Your Cut (/mo)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {referrals.map((ref, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-300">
                          {ref.user}
                        </td>
                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                          {ref.plan}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              ref.status === "Active"
                                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                                : ref.status === "Pending"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                            }`}
                          >
                            {ref.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-500">{ref.date}</td>
                        <td className="px-6 py-4 text-right font-medium text-zinc-900 dark:text-white">
                          {ref.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center py-16 px-4 text-center"
              >
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                  No referrals yet
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
                  Share your link with your network to start earning 20%
                  recurring commissions on every sign-up.
                </p>
                <button
                  onClick={handleCopy}
                  className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy Your Link
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-zinc-50 dark:bg-zinc-900/80 p-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Setup Payouts
                </p>
                <p className="text-xs text-zinc-500">
                  Connect your PayPal or Stripe to receive funds.
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm">
              Connect Account
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
