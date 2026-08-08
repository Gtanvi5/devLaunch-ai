// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   BarChart3,
//   Code2,
//   Swords,
//   Megaphone,
//   Lock,
//   ArrowRight,
//   CheckCircle2,
//   Zap,
//   LayoutDashboard,
//   Database,
//   TerminalSquare,
//   Copy,
//   Check,
//   ChevronRight,
//   AlertCircle,
// } from "lucide-react";
// import Link from "next/link";
// import type { LucideIcon } from "lucide-react";

// // --- Types & Mock Data --- //
// interface TechStackItem {
//   role: string;
//   name: string;
//   icon: LucideIcon;
//   desc: string;
// }

// interface Competitor {
//   name: string;
//   type: "Direct" | "Indirect" | "Status Quo";
//   weakness: string;
//   angle: string;
// }

// interface MockProjectData {
//   id: string;
//   name: string;
//   tagline: string;
//   overview: {
//     score: number;
//     verdict: string;
//     summary: string;
//     strengths: string[];
//     risks: string[];
//   };
//   architecture: {
//     description: string;
//     stack: TechStackItem[];
//     schema: string;
//   };
//   competitors: Competitor[];
// }

// const mockProjectData: MockProjectData = {
//   id: "proj_123",
//   name: "PrepChef",
//   tagline: "Local meal prep marketplace",
//   overview: {
//     score: 84,
//     verdict: "High Viability",
//     summary:
//       "Strong market demand, but requires precise local execution to overcome cold-start logistics.",
//     strengths: [
//       "Capitalizes on the growing 'health-conscious but busy' demographic.",
//       "Low overhead for chefs using existing home or ghost kitchens.",
//       "High retention rate inherently built into weekly subscription models.",
//     ],
//     risks: [
//       "Two-sided marketplace 'cold start' problem requires heavy initial capital.",
//       "Strict local food safety and cottage food laws vary by county.",
//       "Logistics of consistent delivery windows with independent contractors.",
//     ],
//   },
//   architecture: {
//     description:
//       "Optimized for speed-to-market, low initial cost, and seamless multi-party payment splits.",
//     stack: [
//       {
//         role: "Frontend",
//         name: "Next.js + Tailwind",
//         icon: LayoutDashboard,
//         desc: "Fast SEO routing, edge caching, & clean UI components.",
//       },
//       {
//         role: "Backend / Auth",
//         name: "Supabase",
//         icon: Database,
//         desc: "PostgreSQL, instant APIs, Row Level Security & social login.",
//       },
//       {
//         role: "Payments",
//         name: "Stripe Connect",
//         icon: TerminalSquare,
//         desc: "Handles split payments, tax forms, and chef payouts automatically.",
//       },
//     ],
//     schema: `CREATE TABLE users (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   role TEXT CHECK (role IN ('chef', 'customer')),
//   full_name TEXT NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

// CREATE TABLE meals (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   chef_id UUID REFERENCES users(id) ON DELETE CASCADE,
//   title TEXT NOT NULL,
//   price DECIMAL(10,2) NOT NULL,
//   available_portions INT DEFAULT 0
// );`,
//   },
//   competitors: [
//     {
//       name: "UberEats / DoorDash",
//       type: "Indirect",
//       weakness:
//         "Optimized for immediate, single-meal restaurant delivery. Extremely high merchant fees (up to 30%).",
//       angle:
//         "Focus entirely on weekly batch subscriptions. Offer chefs an 85% revenue share to monopolize local talent.",
//     },
//     {
//       name: "CookUnity",
//       type: "Direct",
//       weakness:
//         "Operates exclusively out of massive centralized ghost kitchens, limiting availability to major tier-1 cities.",
//       angle:
//         "Enable local cottage-law chefs. Expand rapidly into tier-2/3 suburbs and food deserts where CookUnity cannot operate.",
//     },
//     {
//       name: "Local FB Groups",
//       type: "Status Quo",
//       weakness:
//         "Zero trust mechanisms, manual Venmo payments, messy spreadsheets, and a disorganized ordering process.",
//       angle:
//         "Bring trust (verified reviews), convenience (Stripe subscriptions), and algorithmic discovery to the existing gray market.",
//     },
//   ],
// };

// const TABS_CONFIG = [
//   { id: "overview", label: "Executive Summary", icon: BarChart3 },
//   { id: "tech", label: "Tech Blueprint", icon: Code2 },
//   { id: "competitors", label: "Competitor Matrix", icon: Swords },
//   { id: "gtm", label: "Go-to-Market", icon: Megaphone, locked: true },
// ];

// // --- Animation Variants --- //
// const staggerContainer = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const fadeUpItem = {
//   hidden: { opacity: 0, y: 15 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 },
//   },
// };

// // --- Helper Components --- //
// const TabTransition = ({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
//     animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//     exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
//     transition={{ duration: 0.3 }}
//     className={`max-w-4xl ${className}`}
//   >
//     {children}
//   </motion.div>
// );

// const Banner = () => (
//   <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600 text-white text-sm font-medium py-3 px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative overflow-hidden rounded-t-[calc(2rem-1px)]">
//     <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714558602/dot-grid_lqmbm8.svg')] opacity-20 mix-blend-overlay" />
//     <div className="flex items-center gap-3 relative z-10">
//       <span className="relative flex h-2.5 w-2.5">
//         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//         <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
//       </span>
//       <span className="tracking-wide text-violet-50">
//         You are viewing a sample report generated by DevLaunch AI.
//       </span>
//     </div>
//     <Link
//       href="/signup"
//       className="group flex items-center gap-1.5 whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-1.5 rounded-full transition-all active:scale-95 relative z-10 backdrop-blur-sm"
//     >
//       Create your own
//       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//     </Link>
//   </div>
// );

// const TabOverview = ({ data }: { data: MockProjectData["overview"] }) => (
//   <>
//     <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-12 bg-white dark:bg-zinc-900/40 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
//       <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-full bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/5 border border-green-200 dark:border-green-500/20 flex items-center justify-center text-4xl sm:text-5xl font-black text-green-600 dark:text-green-400 shadow-inner">
//         <div className="absolute inset-0 rounded-full border-[3px] border-green-400/30 animate-[spin_10s_linear_infinite] border-t-green-500" />
//         {data.score}
//       </div>
//       <div>
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
//           {data.verdict}
//         </h1>
//         <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg text-balance">
//           {data.summary}
//         </p>
//       </div>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//       <motion.div
//         variants={staggerContainer}
//         initial="hidden"
//         animate="show"
//         className="bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-500/5 dark:to-transparent p-6 sm:p-8 rounded-3xl border border-green-100/80 dark:border-green-500/10 h-full"
//       >
//         <h3 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-6 flex items-center gap-2">
//           <CheckCircle2 className="w-5 h-5" /> Key Strengths
//         </h3>
//         <ul className="space-y-5">
//           {data.strengths.map((item, i) => (
//             <motion.li
//               key={i}
//               variants={fadeUpItem}
//               className="flex items-start gap-3.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
//               <span className="leading-relaxed">{item}</span>
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//       <motion.div
//         variants={staggerContainer}
//         initial="hidden"
//         animate="show"
//         className="bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-500/5 dark:to-transparent p-6 sm:p-8 rounded-3xl border border-amber-100/80 dark:border-amber-500/10 h-full"
//       >
//         <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
//           <AlertCircle className="w-5 h-5" /> Primary Risks
//         </h3>
//         <ul className="space-y-5">
//           {data.risks.map((item, i) => (
//             <motion.li
//               key={i}
//               variants={fadeUpItem}
//               className="flex items-start gap-3.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
//               <span className="leading-relaxed">{item}</span>
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//     </div>
//   </>
// );

// const TabTechStack = ({ data }: { data: MockProjectData["architecture"] }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(data.schema);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <>
//       <div className="mb-10">
//         <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
//           System Architecture
//         </h2>
//         <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl text-balance">
//           {data.description}
//         </p>
//       </div>

//       <motion.div
//         variants={staggerContainer}
//         initial="hidden"
//         animate="show"
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
//       >
//         {data.stack.map((tech, i) => (
//           <motion.div
//             key={i}
//             variants={fadeUpItem}
//             className="group bg-white dark:bg-zinc-900/40 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
//           >
//             <div className="w-12 h-12 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
//               <tech.icon className="w-6 h-6" />
//             </div>
//             <p className="text-[11px] font-bold text-violet-600 dark:text-violet-400 mb-2 uppercase tracking-widest">
//               {tech.role}
//             </p>
//             <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
//               {tech.name}
//             </h4>
//             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
//               {tech.desc}
//             </p>
//           </motion.div>
//         ))}
//       </motion.div>

//       <div className="bg-[#0D0D12] rounded-2xl border border-zinc-800/80 overflow-hidden shadow-2xl relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent pointer-events-none" />
//         <div className="flex items-center justify-between px-4 py-3 bg-[#16161D] border-b border-zinc-800/50">
//           <div className="flex gap-2">
//             <div className="w-3 h-3 rounded-full bg-red-500/90 border border-red-600/50 shadow-sm" />
//             <div className="w-3 h-3 rounded-full bg-amber-500/90 border border-amber-600/50 shadow-sm" />
//             <div className="w-3 h-3 rounded-full bg-green-500/90 border border-green-600/50 shadow-sm" />
//           </div>
//           <span className="text-xs font-mono text-zinc-500 select-none absolute left-1/2 -translate-x-1/2">
//             schema.sql
//           </span>
//           <button
//             onClick={handleCopy}
//             className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors active:scale-95 bg-zinc-800/50 hover:bg-zinc-700/50 px-2.5 py-1 rounded-md z-10"
//           >
//             {copied ? (
//               <Check className="w-3.5 h-3.5 text-green-400" />
//             ) : (
//               <Copy className="w-3.5 h-3.5" />
//             )}
//             {copied ? "Copied" : "Copy"}
//           </button>
//         </div>

//         <div
//           data-lenis-prevent
//           className="p-6 overflow-x-auto text-sm font-mono leading-loose flex gap-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full"
//         >
//           <div className="flex flex-col text-zinc-700 select-none text-right shrink-0">
//             {[...Array(14)].map((_, i) => (
//               <span key={i}>{i + 1}</span>
//             ))}
//           </div>
//           <div
//             className="text-zinc-300 whitespace-pre"
//             dangerouslySetInnerHTML={{
//               __html: data.schema
//                 .replace(
//                   /CREATE TABLE/g,
//                   '<span class="text-pink-500 font-semibold">CREATE TABLE</span>',
//                 )
//                 .replace(
//                   /PRIMARY KEY/g,
//                   '<span class="text-amber-300">PRIMARY KEY</span>',
//                 )
//                 .replace(
//                   /REFERENCES|ON DELETE CASCADE|CHECK|IN/g,
//                   '<span class="text-violet-400">$&</span>',
//                 )
//                 .replace(
//                   /UUID|TEXT|DECIMAL|INT|TIMESTAMPTZ/g,
//                   '<span class="text-emerald-400">$&</span>',
//                 )
//                 .replace(
//                   /DEFAULT|NOT NULL/g,
//                   '<span class="text-blue-400">$&</span>',
//                 )
//                 .replace(
//                   /uuid_generate_v4\(\)|NOW\(\)/g,
//                   '<span class="text-amber-200">$&</span>',
//                 ),
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// const TabCompetitors = ({ data }: { data: MockProjectData["competitors"] }) => {
//   const badgeColors = {
//     Direct:
//       "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20",
//     Indirect:
//       "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
//     "Status Quo":
//       "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
//   };

//   return (
//     <>
//       <div className="mb-10">
//         <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
//           Market Analysis
//         </h2>
//         <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl text-balance">
//           Direct and indirect competitors, and your specific angles to beat
//           them.
//         </p>
//       </div>

//       <motion.div
//         variants={staggerContainer}
//         initial="hidden"
//         animate="show"
//         className="grid gap-6"
//       >
//         {data.map((comp, i) => (
//           <motion.div
//             key={i}
//             variants={fadeUpItem}
//             className="flex flex-col lg:flex-row gap-6 p-6 sm:p-8 bg-white dark:bg-zinc-900/40 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-violet-300 dark:hover:border-violet-500/30 transition-all duration-300 group"
//           >
//             <div className="w-full lg:w-64 shrink-0">
//               <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
//                 {comp.name}
//               </h4>
//               <span
//                 className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeColors[comp.type]}`}
//               >
//                 {comp.type}
//               </span>
//             </div>
//             <div className="flex-1 grid sm:grid-cols-2 gap-6 relative">
//               <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 items-center justify-center text-[10px] font-black text-zinc-400 z-10">
//                 VS
//               </div>
//               <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
//                 <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
//                   <ChevronRight className="w-4 h-4" /> Their Weakness
//                 </p>
//                 <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                   {comp.weakness}
//                 </p>
//               </div>
//               <div className="bg-violet-50/50 dark:bg-violet-500/5 p-5 rounded-2xl border border-violet-100 dark:border-violet-500/10">
//                 <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
//                   <Zap className="w-4 h-4" /> Your Angle
//                 </p>
//                 <p className="text-sm text-zinc-900 dark:text-white font-medium leading-relaxed">
//                   {comp.angle}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </>
//   );
// };

// const TabLocked = () => (
//   <div className="h-full flex flex-col relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20 min-h-[600px]">
//     <div
//       className="absolute inset-0 opacity-30 dark:opacity-20 blur-[2px] select-none pointer-events-none p-10"
//       aria-hidden="true"
//     >
//       <div className="w-2/3 h-10 bg-zinc-300 dark:bg-zinc-700 rounded-xl mb-12 animate-pulse" />
//       <div className="grid grid-cols-3 gap-6 mb-12">
//         <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
//         <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse delay-75" />
//         <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse delay-150" />
//       </div>
//       <div className="space-y-6">
//         <div className="h-5 bg-zinc-200 dark:bg-zinc-800 w-full rounded-md animate-pulse delay-75" />
//         <div className="h-5 bg-zinc-200 dark:bg-zinc-800 w-5/6 rounded-md animate-pulse delay-100" />
//         <div className="h-5 bg-zinc-200 dark:bg-zinc-800 w-4/6 rounded-md animate-pulse delay-150" />
//       </div>
//     </div>

//     <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-zinc-950/70 backdrop-blur-md p-6">
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
//         className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 rounded-[2rem] shadow-2xl max-w-md text-center relative overflow-hidden"
//       >
//         <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-violet-500/20 blur-[40px] rounded-full pointer-events-none" />

//         <div className="relative w-20 h-20 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-500/10 dark:to-indigo-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
//           <Lock className="w-8 h-8" />
//         </div>
//         <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">
//           Unlock the Full Strategy
//         </h3>
//         <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed text-sm sm:text-base">
//           The Go-to-Market plan includes step-by-step instructions on acquiring
//           your first 100 users, finding ideal customer profiles, and Day 1
//           marketing copy.
//         </p>
//         <Link
//           href="/signup"
//           className="group relative flex items-center justify-center w-full overflow-hidden rounded-xl bg-zinc-900 dark:bg-white px-6 py-4 font-semibold text-white dark:text-zinc-900 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-black/10 dark:shadow-white/10"
//         >
//           <span className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(150%)]">
//             <span className="relative h-full w-8 bg-white/20 dark:bg-black/10" />
//           </span>
//           <span className="relative flex items-center gap-2">
//             Sign up to unlock{" "}
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </span>
//         </Link>
//         <p className="mt-5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
//           Join 1,000+ founders today
//         </p>
//       </motion.div>
//     </div>
//   </div>
// );

// export default function PublicReportDemo() {
//   const [activeTab, setActiveTab] = useState("overview");

//   return (
//     <main className="min-h-screen bg-zinc-50/50 dark:bg-[#030303] py-8 sm:py-12 md:py-20 selection:bg-violet-500/30">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Main App Container - Removed global overflow-hidden so Sticky can work */}
//         <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-[2rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none flex flex-col relative">
//           <Banner />

//           {/* Wrapper - Removed strict max-heights, let the browser window dictate scrolling */}
//           <div className="flex flex-col lg:flex-row relative">
//             {/* Sidebar Column */}
//             <div className="w-full lg:w-72 bg-zinc-50/50 dark:bg-zinc-900/20 border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800/80 flex flex-col shrink-0 z-20 rounded-bl-[calc(2rem-1px)] max-lg:rounded-none">
//               {/* Sticky Sidebar Inner Container - This locks to the screen as they scroll down! */}
//               <div className="lg:sticky lg:top-0 flex flex-col lg:h-[100dvh]">
//                 <div className="p-6 sm:p-8 shrink-0">
//                   <p className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
//                     Project Report
//                   </p>
//                   <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-2 tracking-tight">
//                     {mockProjectData.name}
//                   </h2>
//                   <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium hidden lg:block">
//                     {mockProjectData.tagline}
//                   </p>
//                 </div>

//                 <nav
//                   role="tablist"
//                   data-lenis-prevent
//                   className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto overscroll-contain px-4 lg:px-6 pb-4 lg:pb-0 scroll-smooth snap-x lg:snap-none snap-mandatory relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//                 >
//                   <div className="lg:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-50/50 dark:from-zinc-900/20 to-transparent pointer-events-none z-10" />
//                   <div className="lg:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-50/50 dark:from-zinc-900/20 to-transparent pointer-events-none z-10" />

//                   {TABS_CONFIG.map((tab) => {
//                     const isActive = activeTab === tab.id;
//                     return (
//                       <button
//                         key={tab.id}
//                         role="tab"
//                         aria-selected={isActive}
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`snap-start flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all relative whitespace-nowrap shrink-0 lg:w-full outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
//                           isActive
//                             ? "text-violet-700 dark:text-violet-300"
//                             : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
//                         }`}
//                       >
//                         {isActive && (
//                           <motion.div
//                             layoutId="active-tab-indicator"
//                             className="absolute inset-0 bg-violet-100 dark:bg-violet-500/15 rounded-xl border border-violet-200/50 dark:border-violet-500/30"
//                             transition={{
//                               type: "spring",
//                               bounce: 0.2,
//                               duration: 0.6,
//                             }}
//                           />
//                         )}
//                         <tab.icon
//                           className={`w-4 h-4 relative z-10 transition-colors ${isActive ? "text-violet-600 dark:text-violet-400" : ""}`}
//                         />
//                         <span className="relative z-10">{tab.label}</span>
//                         {tab.locked && (
//                           <Lock className="w-3.5 h-3.5 ml-1 lg:ml-auto relative z-10 opacity-40" />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </nav>

//                 <div className="hidden lg:block p-6 mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
//                   <Link
//                     href="/signup"
//                     className="group flex items-center justify-center gap-2 w-full bg-violet-600 text-white px-4 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-violet-700 active:scale-95 shadow-lg shadow-violet-500/25"
//                   >
//                     Run Your Idea
//                     <Zap className="w-4 h-4 text-amber-300 group-hover:scale-110 group-hover:-rotate-12 transition-transform" />
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Main Content Area - Removed all internal scrolling wrappers! Let it breathe and expand the page */}
//             <div className="flex-1 w-full min-w-0 p-6 sm:p-8 lg:p-12 relative bg-zinc-50/30 dark:bg-zinc-950/50 rounded-br-[calc(2rem-1px)] max-lg:rounded-b-[calc(2rem-1px)]">
//               <AnimatePresence mode="wait">
//                 {activeTab === "overview" && (
//                   <TabTransition key="overview">
//                     <TabOverview data={mockProjectData.overview} />
//                   </TabTransition>
//                 )}
//                 {activeTab === "tech" && (
//                   <TabTransition key="tech">
//                     <TabTechStack data={mockProjectData.architecture} />
//                   </TabTransition>
//                 )}
//                 {activeTab === "competitors" && (
//                   <TabTransition key="competitors">
//                     <TabCompetitors data={mockProjectData.competitors} />
//                   </TabTransition>
//                 )}
//                 {activeTab === "gtm" && (
//                   <TabTransition key="gtm" className="h-full">
//                     <TabLocked />
//                   </TabTransition>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Code2,
  Swords,
  Megaphone,
  Lock,
  ArrowRight,
  CheckCircle2,
  Zap,
  LayoutDashboard,
  Database,
  TerminalSquare,
  Copy,
  Check,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

// --- Types & Mock Data --- //
interface TechStackItem {
  role: string;
  name: string;
  icon: LucideIcon;
  desc: string;
}

interface Competitor {
  name: string;
  type: "Direct" | "Indirect" | "Status Quo";
  weakness: string;
  angle: string;
}

interface MockProjectData {
  id: string;
  name: string;
  tagline: string;
  overview: {
    score: number;
    verdict: string;
    summary: string;
    strengths: string[];
    risks: string[];
  };
  architecture: {
    description: string;
    stack: TechStackItem[];
    schema: string;
  };
  competitors: Competitor[];
}

const mockProjectData: MockProjectData = {
  id: "proj_123",
  name: "PrepChef",
  tagline: "Local meal prep marketplace",
  overview: {
    score: 84,
    verdict: "High Viability",
    summary:
      "Strong market demand, but requires precise local execution to overcome cold-start logistics.",
    strengths: [
      "Capitalizes on the growing 'health-conscious but busy' demographic.",
      "Low overhead for chefs using existing home or ghost kitchens.",
      "High retention rate inherently built into weekly subscription models.",
    ],
    risks: [
      "Two-sided marketplace 'cold start' problem requires heavy initial capital.",
      "Strict local food safety and cottage food laws vary by county.",
      "Logistics of consistent delivery windows with independent contractors.",
    ],
  },
  architecture: {
    description:
      "Optimized for speed-to-market, low initial cost, and seamless multi-party payment splits.",
    stack: [
      {
        role: "Frontend",
        name: "Next.js + Tailwind",
        icon: LayoutDashboard,
        desc: "Fast SEO routing, edge caching, & clean UI components.",
      },
      {
        role: "Backend / Auth",
        name: "Supabase",
        icon: Database,
        desc: "PostgreSQL, instant APIs, Row Level Security & social login.",
      },
      {
        role: "Payments",
        name: "Stripe Connect",
        icon: TerminalSquare,
        desc: "Handles split payments, tax forms, and chef payouts automatically.",
      },
    ],
    schema: `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT CHECK (role IN ('chef', 'customer')),
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chef_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  available_portions INT DEFAULT 0
);`,
  },
  competitors: [
    {
      name: "UberEats / DoorDash",
      type: "Indirect",
      weakness:
        "Optimized for immediate, single-meal restaurant delivery. Extremely high merchant fees (up to 30%).",
      angle:
        "Focus entirely on weekly batch subscriptions. Offer chefs an 85% revenue share to monopolize local talent.",
    },
    {
      name: "CookUnity",
      type: "Direct",
      weakness:
        "Operates exclusively out of massive centralized ghost kitchens, limiting availability to major tier-1 cities.",
      angle:
        "Enable local cottage-law chefs. Expand rapidly into tier-2/3 suburbs and food deserts where CookUnity cannot operate.",
    },
    {
      name: "Local FB Groups",
      type: "Status Quo",
      weakness:
        "Zero trust mechanisms, manual Venmo payments, messy spreadsheets, and a disorganized ordering process.",
      angle:
        "Bring trust (verified reviews), convenience (Stripe subscriptions), and algorithmic discovery to the existing gray market.",
    },
  ],
};

const TABS_CONFIG = [
  { id: "overview", label: "Executive Summary", icon: BarChart3 },
  { id: "tech", label: "Tech Blueprint", icon: Code2 },
  { id: "competitors", label: "Competitor Matrix", icon: Swords },
  { id: "gtm", label: "Go-to-Market", icon: Megaphone, locked: true },
];

// --- Animation Variants --- //
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// --- Helper Components --- //
const TabTransition = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`max-w-4xl mx-auto ${className}`}
  >
    {children}
  </motion.div>
);

const Banner = () => (
  <div className="relative overflow-hidden bg-gradient-to-r from-violet-900 via-indigo-800 to-violet-900 text-white text-sm font-medium py-3 px-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-t-[calc(2rem-1px)]">
    {/* Animated background elements */}
    <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714558602/dot-grid_lqmbm8.svg')] opacity-30 mix-blend-overlay" />
    <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-500 rounded-full mix-blend-screen filter blur-[50px] animate-pulse" />
    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500 rounded-full mix-blend-screen filter blur-[50px] animate-pulse delay-1000" />

    <div className="flex items-center gap-3 relative z-10">
      <div className="relative flex h-3 w-3 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
      </div>
      <span className="tracking-wide text-violet-100/90 drop-shadow-sm font-medium">
        You are viewing a sample report generated by{" "}
        <span className="font-bold text-white">DevLaunch AI</span>.
      </span>
    </div>
    <Link
      href="/signup"
      className="group flex items-center gap-2 whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 rounded-full transition-all active:scale-95 relative z-10 backdrop-blur-md shadow-lg shadow-black/20"
    >
      Create your own
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const TabOverview = ({ data }: { data: MockProjectData["overview"] }) => (
  <div className="space-y-8">
    <div className="flex flex-col sm:flex-row sm:items-center gap-8 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-green-500/20 transition-colors duration-700" />

      <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full bg-gradient-to-br from-white to-green-50 dark:from-zinc-900 dark:to-green-950/30 border border-green-200/50 dark:border-green-500/20 flex items-center justify-center text-5xl sm:text-6xl font-black shadow-2xl shadow-green-500/20">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-emerald-700 dark:from-green-400 dark:to-emerald-500 drop-shadow-sm">
          {data.score}
        </span>
        <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-green-400/30 animate-[spin_15s_linear_infinite]" />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {data.verdict}
          </h1>
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg max-w-2xl">
          {data.summary}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md p-8 rounded-[2rem] border border-green-200/50 dark:border-green-500/20 shadow-lg shadow-green-500/5 h-full group hover:border-green-300 dark:hover:border-green-500/40 transition-colors"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-[40px] -z-10" />
        <h3 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-6 flex items-center gap-2.5">
          <div className="p-1.5 bg-green-100 dark:bg-green-500/20 rounded-md">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          Key Strengths
        </h3>
        <ul className="space-y-4">
          {data.strengths.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUpItem}
              className="flex items-start gap-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
              <span className="leading-relaxed font-medium">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md p-8 rounded-[2rem] border border-amber-200/50 dark:border-amber-500/20 shadow-lg shadow-amber-500/5 h-full group hover:border-amber-300 dark:hover:border-amber-500/40 transition-colors"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-[40px] -z-10" />
        <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2.5">
          <div className="p-1.5 bg-amber-100 dark:bg-amber-500/20 rounded-md">
            <AlertCircle className="w-4 h-4" />
          </div>
          Primary Risks
        </h3>
        <ul className="space-y-4">
          {data.risks.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUpItem}
              className="flex items-start gap-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
              <span className="leading-relaxed font-medium">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </div>
);

const TabTechStack = ({ data }: { data: MockProjectData["architecture"] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.schema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 mb-3 tracking-tight">
          System Architecture
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl text-balance">
          {data.description}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {data.stack.map((tech, i) => (
          <motion.div
            key={i}
            variants={fadeUpItem}
            className="group relative bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm p-6 rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-violet-400/50 dark:hover:border-violet-500/50 transition-all duration-300 transform-gpu hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-100 to-indigo-50 dark:from-violet-500/20 dark:to-indigo-500/10 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-violet-200/50 dark:border-violet-500/20 shadow-inner">
                <tech.icon className="w-7 h-7" />
              </div>
              <p className="text-[11px] font-bold text-violet-600 dark:text-violet-400 mb-2 uppercase tracking-widest flex items-center gap-1.5">
                {tech.role}
              </p>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                {tech.name}
              </h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                {tech.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-[#0c0c0e] rounded-3xl border border-zinc-800/80 overflow-hidden shadow-2xl relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

        <div className="flex items-center justify-between px-5 py-4 bg-[#121217] border-b border-zinc-800/50">
          <div className="flex gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-500/90 border border-red-600/50 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-amber-500/90 border border-amber-600/50 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/90 border border-green-600/50 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
          </div>
          <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
            <span className="text-xs font-mono text-zinc-400 select-none">
              schema.sql
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-all active:scale-95 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>

        <div
          data-lenis-prevent
          className="p-6 sm:p-8 overflow-x-auto text-[13px] sm:text-sm font-mono leading-loose flex gap-6 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#0c0c0e] [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div className="flex flex-col text-zinc-600 select-none text-right shrink-0">
            {[...Array(14)].map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div
            className="text-zinc-300 whitespace-pre"
            dangerouslySetInnerHTML={{
              __html: data.schema
                .replace(
                  /CREATE TABLE/g,
                  '<span class="text-pink-400 font-semibold">CREATE TABLE</span>',
                )
                .replace(
                  /PRIMARY KEY/g,
                  '<span class="text-amber-300">PRIMARY KEY</span>',
                )
                .replace(
                  /REFERENCES|ON DELETE CASCADE|CHECK|IN/g,
                  '<span class="text-violet-400">$&</span>',
                )
                .replace(
                  /UUID|TEXT|DECIMAL|INT|TIMESTAMPTZ/g,
                  '<span class="text-cyan-400">$&</span>',
                )
                .replace(
                  /DEFAULT|NOT NULL/g,
                  '<span class="text-blue-400">$&</span>',
                )
                .replace(
                  /uuid_generate_v4\(\)|NOW\(\)/g,
                  '<span class="text-amber-200">$&</span>',
                ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TabCompetitors = ({ data }: { data: MockProjectData["competitors"] }) => {
  const badgeColors = {
    Direct:
      "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200/60 dark:border-red-500/20 shadow-sm shadow-red-500/10",
    Indirect:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20 shadow-sm shadow-amber-500/10",
    "Status Quo":
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200/60 dark:border-zinc-700 shadow-sm shadow-zinc-500/10",
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 mb-3 tracking-tight">
          Market Analysis
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl text-balance">
          Direct and indirect competitors, and your specific angles to beat
          them.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-8"
      >
        {data.map((comp, i) => (
          <motion.div
            key={i}
            variants={fadeUpItem}
            className="flex flex-col lg:flex-row gap-6 p-6 sm:p-8 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-violet-300 dark:hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 group transform-gpu hover:-translate-y-1"
          >
            <div className="w-full lg:w-64 shrink-0 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {comp.name}
              </h4>
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border ${badgeColors[comp.type]}`}
                >
                  {comp.type}
                </span>
              </div>
            </div>

            <div className="flex-1 grid sm:grid-cols-[1fr_auto_1fr] gap-6 items-stretch relative">
              <div className="bg-zinc-50/80 dark:bg-zinc-900/60 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col justify-center">
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Their Weakness
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {comp.weakness}
                </p>
              </div>

              <div className="hidden sm:flex flex-col items-center justify-center relative">
                <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
                <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-[11px] font-black text-zinc-400 z-10 shadow-sm">
                  VS
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-50/80 to-transparent dark:from-violet-500/10 dark:to-transparent p-6 rounded-2xl border border-violet-100 dark:border-violet-500/20 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-400/10 rounded-full blur-xl" />
                <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10">
                  <Target className="w-4 h-4" /> Your Angle
                </p>
                <p className="text-sm text-zinc-900 dark:text-white font-medium leading-relaxed relative z-10">
                  {comp.angle}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const TabLocked = () => (
  <div className="h-full flex flex-col relative overflow-hidden rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 min-h-[600px] shadow-inner">
    {/* Fake Content Skeleton */}
    <div
      className="absolute inset-0 opacity-20 dark:opacity-10 select-none pointer-events-none p-10 flex flex-col"
      aria-hidden="true"
    >
      <div className="w-1/2 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-xl mb-12" />
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
        <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
        <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
      </div>
      <div className="space-y-6 flex-1">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-full rounded-md" />
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-5/6 rounded-md" />
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-4/6 rounded-md" />
      </div>
    </div>

    {/* The Blur & Modal */}
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/60 backdrop-blur-[12px] p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] max-w-lg text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-gradient-to-b from-violet-500/20 to-transparent blur-[40px] pointer-events-none" />

        <div className="relative w-24 h-24 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-500/20 dark:to-indigo-500/20 border border-violet-200 dark:border-violet-500/30 text-violet-600 dark:text-violet-400 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner transform rotate-3">
          <Lock className="w-10 h-10 -rotate-3" />
        </div>

        <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
          Unlock Full Strategy
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed text-sm sm:text-base font-medium text-balance mx-auto">
          The Go-to-Market plan includes step-by-step instructions on acquiring
          your first 100 users, finding ideal customer profiles, and Day 1
          marketing copy.
        </p>

        <Link
          href="/signup"
          className="group relative flex items-center justify-center w-full overflow-hidden rounded-2xl bg-zinc-900 dark:bg-white px-8 py-4 font-bold text-white dark:text-zinc-900 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-zinc-900/20 dark:shadow-white/10"
        >
          <span className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(150%)]">
            <span className="relative h-full w-10 bg-white/20 dark:bg-black/10" />
          </span>
          <span className="relative flex items-center gap-2 text-base">
            Sign up to unlock{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <p className="mt-6 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
          Join 1,000+ founders today
        </p>
      </motion.div>
    </div>
  </div>
);

export default function PublicReportDemo() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#030303] py-8 sm:py-12 md:py-20 selection:bg-violet-500/30 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-400/20 to-transparent blur-[100px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-3xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-[2rem] shadow-2xl shadow-zinc-200/40 dark:shadow-black/50 flex flex-col relative">
          <Banner />

          <div className="flex flex-col lg:flex-row relative">
            {/* Sidebar Column */}
            <div className="w-full lg:w-72 bg-white/50 dark:bg-zinc-900/20 border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800/80 flex flex-col shrink-0 z-20 rounded-bl-[calc(2rem-1px)] max-lg:rounded-none relative overflow-hidden">
              {/* Subtle sidebar gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-900/10 pointer-events-none" />

              <div className="lg:sticky lg:top-0 flex flex-col lg:h-[100dvh] relative z-10">
                <div className="p-6 sm:p-8 shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    Project Report
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 leading-tight mb-2 tracking-tight">
                    {mockProjectData.name}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium hidden lg:block">
                    {mockProjectData.tagline}
                  </p>
                </div>

                <nav
                  role="tablist"
                  data-lenis-prevent
                  className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto overscroll-contain px-4 lg:px-6 pb-4 lg:pb-0 scroll-smooth snap-x lg:snap-none snap-mandatory relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <div className="lg:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
                  <div className="lg:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />

                  {TABS_CONFIG.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.id)}
                        className={`snap-start flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 relative whitespace-nowrap shrink-0 lg:w-full outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                          isActive
                            ? "text-violet-700 dark:text-violet-300"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-tab-indicator"
                            className="absolute inset-0 bg-white dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <tab.icon
                          className={`w-4.5 h-4.5 relative z-10 transition-colors ${isActive ? "text-violet-600 dark:text-violet-400" : ""}`}
                        />
                        <span className="relative z-10">{tab.label}</span>
                        {tab.locked && (
                          <Lock className="w-3.5 h-3.5 ml-1 lg:ml-auto relative z-10 opacity-50" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="hidden lg:block p-6 mt-auto shrink-0 relative">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
                  <Link
                    href="/signup"
                    className="group flex items-center justify-center gap-2 w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-4 rounded-2xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 dark:shadow-white/10"
                  >
                    Run Your Idea
                    <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 group-hover:-rotate-12 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full min-w-0 p-6 sm:p-8 lg:p-12 relative bg-zinc-50/30 dark:bg-zinc-950/30 rounded-br-[calc(2rem-1px)] max-lg:rounded-b-[calc(2rem-1px)]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <TabTransition key="overview">
                    <TabOverview data={mockProjectData.overview} />
                  </TabTransition>
                )}
                {activeTab === "tech" && (
                  <TabTransition key="tech">
                    <TabTechStack data={mockProjectData.architecture} />
                  </TabTransition>
                )}
                {activeTab === "competitors" && (
                  <TabTransition key="competitors">
                    <TabCompetitors data={mockProjectData.competitors} />
                  </TabTransition>
                )}
                {activeTab === "gtm" && (
                  <TabTransition key="gtm" className="h-full">
                    <TabLocked />
                  </TabTransition>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
