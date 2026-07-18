"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Zap,
  CheckCircle2,
  Download,
  ExternalLink,
  Sparkles,
  Camera,
  Mail,
  Smartphone,
  Laptop,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Billing & Credits", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const MOCK_INVOICES = [
  { id: "INV-2026-08", date: "Aug 18, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-07", date: "Jul 18, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-06", date: "Jun 18, 2026", amount: "$49.00", status: "Paid" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile"); // Changed default to profile

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
      <div className="max-w-5xl mx-auto h-full">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your subscription, credits, and preferences.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
              {SETTINGS_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-white dark:bg-zinc-900 text-violet-600 dark:text-violet-400 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-violet-600 dark:text-violet-400"
                          : "text-zinc-400"
                      }`}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Settings Content Area */}
          <main className="flex-1 min-w-0 pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "billing" && <BillingTab />}
                {activeTab === "notifications" && <NotificationsTab />}
                {activeTab === "security" && <SecurityTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

// --- PROFILE TAB CONTENT ---
function ProfileTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm p-6 md:p-8">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">
          Personal Information
        </h3>

        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 border-2 border-white dark:border-zinc-900 shadow-sm flex items-center justify-center overflow-hidden">
              <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                JD
              </span>
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300 shadow-sm hover:text-violet-600 transition-colors">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Upload New
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-zinc-200 dark:border-zinc-700"
              >
                Remove
              </Button>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Recommended: Square JPG, PNG, or GIF, at least 400x400.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              First Name
            </label>
            <input
              type="text"
              defaultValue="John"
              className="w-full bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl p-3 text-sm transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Last Name
            </label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl p-3 text-sm transition-all outline-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl p-3 text-sm transition-all outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end border-t border-zinc-200 dark:border-zinc-800/50 pt-6">
          <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-6 h-10 font-semibold text-sm shadow-md transition-all">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- BILLING TAB CONTENT ---
function BillingTab() {
  const creditsUsed = 45;
  const creditsTotal = 100;
  const creditPercentage = (creditsUsed / creditsTotal) * 100;

  return (
    <div className="space-y-8">
      {/* Current Plan Card */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden relative shadow-sm">
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Pro Plan
                </h2>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Active
                </span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Billed $49.00 monthly. Your next charge is on Sep 18, 2026.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-zinc-200 dark:border-zinc-700"
              >
                Cancel Plan
              </Button>
              <Button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100">
                Update Billing{" "}
                <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </div>
          </div>

          {/* Credits Usage Visualizer */}
          <div className="mt-8 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-violet-500" /> API Credits Usage
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Used for generating AI validation reports.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {creditsUsed}
                </span>
                <span className="text-zinc-500"> / {creditsTotal}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${creditPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  creditPercentage > 80 ? "bg-amber-500" : "bg-violet-500"
                }`}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-zinc-500">Resets in 12 days</span>
              <button className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
                Buy Credit Add-on
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Included (Reassurance) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          "100 AI Generation Credits per month",
          "Advanced Competitor Matrix Access",
          "Export to White-label PDF",
          "Priority 24/7 Support",
        ].map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-lg">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVOICES.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="bg-white dark:bg-zinc-900 border-b last:border-0 border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{invoice.date}</td>
                  <td className="px-6 py-4 text-zinc-900 dark:text-white">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <Download className="w-4 h-4 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- NOTIFICATIONS TAB CONTENT ---
function NotificationsTab() {
  // Simple state representation for demo purposes
  const [toggles, setToggles] = useState({
    marketing: true,
    reports: true,
    security: true,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm p-6 md:p-8">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
          Notification Preferences
        </h3>
        <p className="text-sm text-zinc-500 mb-8">
          Choose what updates you want to receive and where.
        </p>

        <div className="space-y-6">
          {/* Item 1 */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Completed Validation Reports
                </h4>
                <p className="text-sm text-zinc-500 mt-1">
                  Get notified via email when your AI analysis is ready.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("reports")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                toggles.reports
                  ? "bg-violet-600"
                  : "bg-zinc-200 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.reports ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* Item 2 */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Security Alerts
                </h4>
                <p className="text-sm text-zinc-500 mt-1">
                  Important updates regarding your account security.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("security")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                toggles.security
                  ? "bg-violet-600"
                  : "bg-zinc-200 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.security ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* Item 3 */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Marketing & Updates
                </h4>
                <p className="text-sm text-zinc-500 mt-1">
                  Receive news about new features and product updates.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggle("marketing")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                toggles.marketing
                  ? "bg-violet-600"
                  : "bg-zinc-200 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.marketing ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SECURITY TAB CONTENT ---
function SecurityTab() {
  return (
    <div className="space-y-6">
      {/* Password Management */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-5 h-5 text-zinc-400" />
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
            Change Password
          </h3>
        </div>

        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl p-3 text-sm transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl p-3 text-sm transition-all outline-none"
            />
          </div>
          <div className="pt-2">
            <Button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100">
              Update Password
            </Button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm p-6 md:p-8">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
          Active Sessions
        </h3>
        <p className="text-sm text-zinc-500 mb-6">
          You are currently logged in to these devices.
        </p>

        <div className="space-y-4">
          {/* Current Session */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/5">
            <div className="flex items-center gap-4">
              <Laptop className="w-8 h-8 text-violet-600 dark:text-violet-400 shrink-0 p-1.5 bg-white dark:bg-zinc-900 rounded-lg shadow-sm" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  MacBook Pro (Mac OS)
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Chrome • New York, USA • Current Session
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-white dark:bg-zinc-900 px-2 py-1 rounded-md border border-violet-100 dark:border-violet-500/20">
              Active Now
            </span>
          </div>

          {/* Other Session */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <div className="flex items-center gap-4">
              <Smartphone className="w-8 h-8 text-zinc-500 shrink-0 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  iPhone 14 Pro
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Safari • New York, USA • Last seen 2 days ago
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
