"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredPost = {
  title: "How Multi-Agent AI is Reshaping Startup Validation in 2026",
  excerpt:
    "Discover how specialized AI agents (Marketer, Developer, and Investor) working in parallel can predict startup success with unprecedented accuracy, saving founders months of wasted effort.",
  category: "Artificial Intelligence",
  date: "July 15, 2026",
  readTime: "8 min read",
  author: {
    name: "Sarah Chen",
    role: "Head of AI Research",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  imageUrl:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
  slug: "#featured",
};

const blogPosts = [
  {
    title: "The Ultimate Guide to B2B SaaS Metrics",
    excerpt:
      "Stop tracking vanity metrics. Here are the 5 numbers that actually determine if your software business will survive its first year.",
    category: "Startups",
    date: "July 02, 2026",
    readTime: "5 min read",
    author: {
      name: "Marcus Reid",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    slug: "#1",
  },
  {
    title: "Bootstrapping vs. VC: What the Data Says",
    excerpt:
      "We analyzed 10,000 startups generated through DevLaunch AI. The findings on funding paths might completely change your strategy.",
    category: "Venture Capital",
    date: "June 28, 2026",
    readTime: "6 min read",
    author: {
      name: "Elena Rostova",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop",
    slug: "#2",
  },
  {
    title: "Shipping Faster with Next.js 15 & Prisma",
    excerpt:
      "A deep dive into the modern stack we use at DevLaunch AI to maintain speed while scaling our database operations.",
    category: "Engineering",
    date: "June 14, 2026",
    readTime: "10 min read",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    slug: "#3",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-sm font-semibold mb-6 border border-violet-200 dark:border-violet-500/20">
            <Sparkles className="w-4 h-4" />
            DevLaunch Insights
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-900 dark:text-white mb-6">
            Thoughts, metrics, and tactics for modern founders.
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Read our latest research on AI, startup validation, and software
            engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Link
            href={featuredPost.slug}
            className="group block"
            aria-label={`Read featured post: ${featuredPost.title}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900/40 rounded-3xl p-4 md:p-6 border border-zinc-200 dark:border-zinc-800 transition-colors hover:border-violet-300 dark:hover:border-violet-700/80 shadow-sm hover:shadow-md">
              <div className="relative h-64 lg:h-96 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center px-4 lg:px-8 py-4">
                <span className="text-sm font-bold text-violet-600 dark:text-violet-400 mb-4 tracking-wide uppercase">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white dark:border-zinc-900"
                    />
                    <div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="h-full"
            >
              <Link
                href={post.slug}
                aria-label={`Read post: ${post.title}`}
                className="group flex flex-col h-full bg-white dark:bg-zinc-900/40 rounded-3xl p-4 border border-zinc-200 dark:border-zinc-800 transition-colors hover:border-violet-300 dark:hover:border-violet-700/80 shadow-sm hover:shadow-md"
              >
                <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-6">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="flex flex-col flex-1 px-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={28}
                        height={28}
                        className="rounded-full border border-zinc-200 dark:border-zinc-700"
                      />
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {post.author.name}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors">
                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:-rotate-45 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
