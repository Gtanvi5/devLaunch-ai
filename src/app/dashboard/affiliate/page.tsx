// // import Link from "next/link";
// // import { Metadata } from "next";
// // import { Rocket, DollarSign, Link as LinkIcon, Users } from "lucide-react";

// // export const metadata: Metadata = {
// //   title: "Affiliate Program | DevLaunch AI",
// //   description:
// //     "Earn a 30% recurring commission by referring founders to DevLaunch AI.",
// // };

// // export default function AffiliateProgram() {
// //   return (
// //     <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24 relative overflow-hidden">
// //       {/* Background Glow */}
// //       <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />

// //       <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 text-center">
// //         <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-violet-600 bg-violet-500/10 dark:text-violet-400 border border-violet-500/20 mb-8">
// //           DevLaunch Partners
// //         </span>
// //         <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
// //           Earn{" "}
// //           <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
// //             30% recurring
// //           </span>{" "}
// //           commission.
// //         </h1>
// //         <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12">
// //           Help founders build better products and get paid for it. Earn a 30%
// //           cut for every month your referral stays subscribed, forever.
// //         </p>

// //         <a
// //           href="#"
// //           className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-white px-8 font-medium text-white dark:text-zinc-900 transition-transform hover:scale-105 active:scale-95"
// //         >
// //           Apply to Affiliate Program
// //         </a>

// //         <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
// //           <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
// //             <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
// //               <LinkIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
// //               1. Get your link
// //             </h3>
// //             <p className="text-zinc-500 dark:text-zinc-400 text-sm">
// //               Sign up and get a custom tracking link to share with your
// //               audience.
// //             </p>
// //           </div>
// //           <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
// //             <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
// //               <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
// //               2. Share it
// //             </h3>
// //             <p className="text-zinc-500 dark:text-zinc-400 text-sm">
// //               Promote DevLaunch AI on your blog, Twitter, newsletter, or
// //               YouTube.
// //             </p>
// //           </div>
// //           <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
// //             <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
// //               <DollarSign className="w-5 h-5 text-violet-600 dark:text-violet-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
// //               3. Get paid
// //             </h3>
// //             <p className="text-zinc-500 dark:text-zinc-400 text-sm">
// //               Earn 30% of their subscription fee every single month they stay
// //               active.
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Link2,
//   Copy,
//   Check,
//   DollarSign,
//   Users,
//   MousePointerClick,
//   Wallet,
//   ArrowUpRight,
//   Info
// } from "lucide-react";

// const stats = [
//   { name: "Total Earnings", value: "$1,240.00", icon: DollarSign, description: "Lifetime commission paid out" },
//   { name: "Pending Payout", value: "$320.00", icon: Wallet, description: "Will be paid on the 1st of next month" },
//   { name: "Total Referrals", value: "48", icon: Users, description: "Users who signed up via your link" },
//   { name: "Link Clicks", value: "842", icon: MousePointerClick, description: "Unique clicks on your referral link" },
// ];

// const recentReferrals = [
//   { id: 1, user: "user_***92@gmail.com", plan: "Pro Plan ($49/mo)", date: "2026-07-18", commission: "$9.80", status: "Active", type: "Recurring" },
//   { id: 2, user: "admin_***ks@startup.io", plan: "Enterprise ($199/mo)", date: "2026-07-12", commission: "$39.80", status: "Active", type: "Recurring" },
//   { id: 3, user: "founder***1@hey.com", plan: "Pro Plan ($49/mo)", date: "2026-07-05", commission: "$9.80", status: "Paid", type: "Recurring" },
//   { id: 4, user: "hello***@indie.dev", plan: "Starter Plan ($19/mo)", date: "2026-06-28", commission: "$3.80", status: "Paid", type: "Recurring" },
// ];

// export default function AffiliateDashboard() {
//   const [copied, setCopied] = useState(false);
//   const referralLink = "https://devlaunch.ai/?via=alex_founder";

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(referralLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-6 md:p-10 pt-24">
//       <div className="mx-auto max-w-6xl">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
//               Affiliate Program
//             </h1>
//             <p className="text-zinc-500 dark:text-zinc-400">
//               Earn a 20% recurring monthly commission for every founder you bring to DevLaunch AI.
//             </p>
//           </div>
//           <div className="flex items-center gap-2 text-xs bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5">
//             <Info className="w-4 h-4 text-violet-500 shrink-0" />
//             <span>Payouts are processed automatically via PayPal/Stripe on the 1st of each month.</span>
//           </div>
//         </div>

//         {/* Link & Setup Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

//           {/* Main Referral Link Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="lg:col-span-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between"
//           >
//             <div>
//               <div className="w-10 h-10 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center mb-6">
//                 <Link2 className="w-5 h-5" />
//               </div>
//               <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
//                 Your Unique Sharing Link
//               </h3>
//               <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
//                 Share this link on Twitter/X, newsletters, blogs, or with fellow indie hackers. Anyone who upgrades within 60 days counts as your referral.
//               </p>
//             </div>

//             <div className="relative flex items-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2.5">
//               <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400 px-3 truncate select-all">
//                 {referralLink}
//               </span>
//               <button
//                 onClick={copyToClipboard}
//                 className={`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
//                   copied
//                     ? "bg-emerald-600 text-white"
//                     : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
//                 }`}
//               >
//                 {copied ? (
//                   <>
//                     <Check className="w-4 h-4" />
//                     Copied!
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="w-4 h-4" />
//                     Copy Link
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>

//           {/* Quick Rules Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg shadow-violet-500/10"
//           >
//             <div>
//               <h3 className="text-lg font-bold mb-4">Program Rules</h3>
//               <ul className="space-y-3.5 text-sm text-violet-100">
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
//                   20% Recurring Commission
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
//                   60-Day Cookie Retention
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
//                   No Minimum Payout Threshold
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
//                   Self-referrals are strictly prohibited
//                 </li>
//               </ul>
//             </div>

//             <a
//               href="mailto:affiliates@devlaunch.ai"
//               className="mt-6 inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-2.5 transition-colors"
//             >
//               Contact Support <ArrowUpRight className="w-3.5 h-3.5" />
//             </a>
//           </motion.div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {stats.map((stat, idx) => (
//             <motion.div
//               key={stat.name}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 + idx * 0.05 }}
//               className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.name}</span>
//                 <stat.icon className="w-4 h-4 text-violet-500" />
//               </div>
//               <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{stat.value}</div>
//               <p className="text-xs text-zinc-400 dark:text-zinc-500">{stat.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Referral Ledger */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm"
//         >
//           <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
//             <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Recent Conversions</h3>
//             <p className="text-xs text-zinc-500">A detailed breakdown of active conversion attribution.</p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-left min-w-[700px]">
//               <thead>
//                 <tr className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
//                   <th className="p-4 pl-6">Referred Account</th>
//                   <th className="p-4">Tier Purchased</th>
//                   <th className="p-4">Conversion Date</th>
//                   <th className="p-4">Commission Type</th>
//                   <th className="p-4 text-center">Your Payout</th>
//                   <th className="p-4 pr-6 text-center">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
//                 {recentReferrals.map((row) => (
//                   <tr key={row.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors">
//                     <td className="p-4 pl-6 font-mono text-zinc-600 dark:text-zinc-400 text-xs">{row.user}</td>
//                     <td className="p-4 text-zinc-900 dark:text-zinc-300 font-medium">{row.plan}</td>
//                     <td className="p-4 text-zinc-500">{row.date}</td>
//                     <td className="p-4 text-zinc-500">{row.type}</td>
//                     <td className="p-4 font-semibold text-zinc-900 dark:text-white text-center">{row.commission}</td>
//                     <td className="p-4 pr-6 text-center">
//                       <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
//                         row.status === "Active"
//                           ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
//                           : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
//                       }`}>
//                         {row.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  Twitter,
  Linkedin,
} from "lucide-react";

// Mock Data for the Dashboard
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

const referrals = [
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

export default function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const affiliateLink = "https://devlaunch.ai/?via=alex_founder";

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-4 md:p-8 pt-24 md:pt-8 lg:pl-72">
      {/* Note: `lg:pl-72` assumes you have a fixed sidebar in your dashboard layout. 
          Adjust depending on your actual dashboard shell layout. */}

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white shadow-lg shadow-violet-500/20 relative overflow-hidden"
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

            {/* The Link Copy Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex items-center gap-2 max-w-md">
              <input
                type="text"
                readOnly
                value={affiliateLink}
                className="bg-transparent border-none text-white w-full px-3 focus:outline-none font-medium truncate"
              />
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-2 bg-white text-violet-700 hover:bg-violet-50 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Decorative abstract shapes */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute right-10 -bottom-20 w-64 h-64 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Quick Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <span className="text-sm font-medium text-zinc-500">
            Quick Share:
          </span>
          <button className="flex items-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
            <Twitter className="w-4 h-4" /> Twitter
          </button>
          <button className="flex items-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </button>
        </motion.div>

        {/* Metrics Grid */}
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

        {/* Recent Referrals Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Recent Referrals
            </h2>
            <button className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
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
          </div>

          {/* Setup Payout CTA */}
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
