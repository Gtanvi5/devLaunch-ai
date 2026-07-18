"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Globe,
  Cpu,
  LineChart,
  FileText,
  CheckCircle2,
  Loader2,
  Terminal,
} from "lucide-react";

const AGENT_STEPS = [
  { id: 1, label: "Initializing Research Agent", icon: Search },
  { id: 2, label: "Scraping Web for Competitors", icon: Globe },
  { id: 3, label: "Analyzing Market Fit & Demographics", icon: Cpu },
  { id: 4, label: "Drafting Financial Projections", icon: LineChart },
  { id: 5, label: "Synthesizing Final Validation Report", icon: FileText },
];

const MOCK_LOGS = [
  "Booting DevLaunch AI core...",
  "Querying global SaaS registry...",
  "Found 14 direct competitors in sector.",
  "Analyzing competitor pricing pages (3/14)...",
  "Extracting feature parity matrix...",
  "Evaluating search volume for keywords...",
  "Calculating estimated customer acquisition cost (CAC)...",
  "Running Monte Carlo simulation for revenue...",
  "Structuring 10-page output...",
  "Applying custom branding to report...",
  "Finalizing PDF generation...",
];

export default function ReportLoadingState({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  // Handle the overall progress and step advancement
  useEffect(() => {
    const totalDuration = 12000; // 12 seconds total for the demo
    const updateInterval = 100;
    const stepDuration = totalDuration / AGENT_STEPS.length;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (totalDuration / updateInterval);

        // Update current step based on progress
        const newStep = Math.floor((next / 100) * AGENT_STEPS.length);
        if (newStep !== currentStep && newStep < AGENT_STEPS.length) {
          setCurrentStep(newStep);
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500); // Brief pause at 100% before firing complete
          return 100;
        }
        return next;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  // Handle the fake terminal logs popping up over time
  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < MOCK_LOGS.length) {
        setVisibleLogs((prev) => [...prev, MOCK_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 1000); // Add a new log every second

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center border border-violet-200 dark:border-violet-500/30">
            <Cpu className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Multi-Agent Processing
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Please wait while we validate your idea.
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-violet-600 dark:text-violet-400">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Main Content Area: Steps & Terminal */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left Side: Step Tracker */}
        <div className="flex-1 p-6 border-r border-zinc-100 dark:border-zinc-800/50 overflow-y-auto">
          <div className="space-y-6">
            {AGENT_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const isUpcoming = index > currentStep;

              return (
                <div key={step.id} className="flex items-start gap-4">
                  <div className="relative mt-1">
                    {/* Connection Line */}
                    {index !== AGENT_STEPS.length - 1 && (
                      <div
                        className={`absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 transition-colors duration-500 ${
                          isCompleted
                            ? "bg-violet-500"
                            : "bg-zinc-200 dark:bg-zinc-800"
                        }`}
                      />
                    )}

                    {/* Status Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-violet-500 border-violet-500 text-white"
                          : isActive
                            ? "bg-white dark:bg-zinc-900 border-violet-500 text-violet-500 shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)]"
                            : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`pt-1.5 transition-colors duration-300 ${
                      isActive
                        ? "text-zinc-900 dark:text-white font-medium"
                        : isCompleted
                          ? "text-zinc-600 dark:text-zinc-300"
                          : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Terminal Output */}
        <div className="flex-1 bg-zinc-950 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

          <div className="flex items-center gap-2 mb-4 text-zinc-500 border-b border-zinc-800/50 pb-4">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-mono tracking-wider uppercase">
              System Logs
            </span>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col justify-end space-y-2 font-mono text-xs">
            <AnimatePresence initial={false}>
              {visibleLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-zinc-400"
                >
                  <span className="text-emerald-500 mr-2">➜</span>
                  {log}
                </motion.div>
              ))}
              {/* Blinking cursor effect for the active state */}
              {progress < 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  className="w-2 h-4 bg-violet-500 mt-2"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
    </div>
  );
}
