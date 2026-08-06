"use client";

import { motion } from "framer-motion";
import { Webhook, Activity, Terminal, AlertTriangle, Plus } from "lucide-react";
import ApiKeysManager from "@/components/ApiKeysManager";

const webhooks = [
  {
    id: 1,
    url: "https://api.yourstartup.com/webhooks/devlaunch",
    events: ["report.completed", "score.updated"],
    status: "Active",
  },
];

export default function ApiSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Developer Settings
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your API keys, monitor usage, and configure webhook endpoints
          for your application.
        </p>
      </div>

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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ApiKeysManager />
      </motion.div>

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
  );
}
