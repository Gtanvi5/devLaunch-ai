"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Webhook,
  Activity,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  MoreVertical,
} from "lucide-react";

// Mock Data
const apiKeys = [
  {
    id: 1,
    name: "Production Key",
    prefix: "dev_live_",
    key: "sk_live_9a8b7c6d5e4f3g2h1i0j",
    created: "Jul 10, 2026",
    lastUsed: "2 mins ago",
  },
  {
    id: 2,
    name: "Staging / Testing",
    prefix: "dev_test_",
    key: "sk_test_1a2b3c4d5e6f7g8h9i0j",
    created: "Jul 12, 2026",
    lastUsed: "Never",
  },
];

const webhooks = [
  {
    id: 1,
    url: "https://api.yourstartup.com/webhooks/devlaunch",
    events: ["report.completed", "score.updated"],
    status: "Active",
  },
];

export default function ApiSettingsPage() {
  const [visibleKeys, setVisibleKeys] = useState<Record<number, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<number | null>(null);

  const toggleKeyVisibility = (id: number) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: number, fullKey: string) => {
    navigator.clipboard.writeText(fullKey);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Masking function for API keys
  const maskKey = (key: string) => {
    const prefix = key.substring(0, 8);
    return `${prefix}${"*".repeat(24)}`;
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] p-4 md:p-8 pt-24 md:pt-8 lg:pl-72">
      {/* Settings Layout Wrapper - Assuming a sidebar exists */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Developer Settings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your API keys, monitor usage, and configure webhook endpoints
            for your application.
          </p>
        </div>

        {/* API Usage Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center border border-violet-100 dark:border-violet-500/20">
              <Activity className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                API Usage
              </h2>
              <p className="text-xs text-zinc-500">
                Current billing cycle (Jul 1 - Jul 31)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-zinc-900 dark:text-white">
                4,250 requests
              </span>
              <span className="text-zinc-500">10,000 limit</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-violet-500 h-3 rounded-full"
                style={{ width: "42.5%" }}
              ></div>
            </div>
            <p className="text-xs text-zinc-500 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              You are currently using 42% of your monthly quota. Upgrade to
              Enterprise for unlimited API calls.
            </p>
          </div>
        </motion.div>

        {/* API Keys Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm"
        >
          <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Key className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  API Keys
                </h2>
                <p className="text-xs text-zinc-500">
                  Do not share your API keys in public repositories.
                </p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm">
              <Plus className="w-4 h-4" /> Create New Key
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Secret Key</th>
                  <th className="px-6 py-4 font-medium">Created</th>
                  <th className="px-6 py-4 font-medium">Last Used</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {apiKeys.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-300">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <code className="bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded text-zinc-700 dark:text-zinc-300 font-mono text-xs border border-zinc-200 dark:border-zinc-800">
                          {visibleKeys[item.id] ? item.key : maskKey(item.key)}
                        </code>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleKeyVisibility(item.id)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            title={
                              visibleKeys[item.id] ? "Hide Key" : "Reveal Key"
                            }
                          >
                            {visibleKeys[item.id] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopy(item.id, item.key)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            title="Copy to clipboard"
                          >
                            {copiedKey === item.id ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{item.created}</td>
                    <td className="px-6 py-4 text-zinc-500">{item.lastUsed}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Webhooks Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm"
        >
          <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                <Webhook className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Webhooks
                </h2>
                <p className="text-xs text-zinc-500">
                  Receive real-time HTTP requests when validation events occur.
                </p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
              <Plus className="w-4 h-4" /> Add Endpoint
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {webhooks.length > 0 ? (
              <div className="space-y-4">
                {webhooks.map((hook) => (
                  <div
                    key={hook.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {hook.url}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {hook.events.map((event) => (
                          <span
                            key={event}
                            className="text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-300 dark:border-zinc-700"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">
                      Edit details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Terminal className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">
                  No webhooks configured yet.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
