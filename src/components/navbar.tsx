"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Magnetic from "@/components/ui/magnetic";
import Image from "next/image";

// Clean, Tier-1 SaaS Navigation Links
const navLinks = [
  { name: "Features", path: "/#features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Docs", path: "/docs" },
  { name: "Changelog", path: "/changelog" },
  { name: "Blog", path: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();

  // Handle Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Scroll spy: Track which section is currently active on the screen (for hash links)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );

    navLinks.forEach((link) => {
      if (link.path.startsWith("/#")) {
        const id = link.path.replace("/#", "");
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Trigger shrink and glassmorphism on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    // Only smooth scroll if we are on the homepage AND it's a hash link
    if (path.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = path.replace("/#", "");
      const elem = document.getElementById(targetId);

      if (elem) {
        const offset = 80;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    setIsOpen(false);
  };

  // Determine the active path for the pill indicator
  const currentPath =
    activeSection && pathname === "/" ? activeSection : pathname;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between"
          animate={{ height: isScrolled ? "4rem" : "5rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* 1. Magnetic Logo Brand */}
          <Magnetic intensity={0.1}>
            <Link
              href="/"
              onClick={(e) => handleScroll(e, "/#")}
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900 dark:text-white group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative h-8 w-8"
              >
                <Image
                  src="/dark-logo.png"
                  alt="DevLaunch AI Logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </motion.div>
              <span>
                DevLaunch{" "}
                <span className="text-indigo-600 dark:text-indigo-500">AI</span>
              </span>
            </Link>
          </Magnetic>

          {/* 2. Desktop Navigation with Sliding Pill */}
          <div
            className="hidden md:flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              // Exact match for pages, prefix match for nested routes like /blog/post-1
              const isActive =
                currentPath === link.path ||
                (link.path !== "/" &&
                  link.path !== "/#" &&
                  pathname.startsWith(link.path));

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleScroll(e, link.path)}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  className="relative px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  {/* Hover Background */}
                  {hoveredPath === link.path && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                  {/* Active Background */}
                  {isActive && hoveredPath === null && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive || hoveredPath === link.path
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* 3. Desktop Actions & Glowing CTA */}
          <div className="hidden md:flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}

            {isSignedIn ? (
              <div className="flex items-center gap-4 ml-2 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 border border-zinc-200 dark:border-zinc-800 hover:scale-105 transition-transform",
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="font-medium text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full px-4"
                  >
                    Log in
                  </Button>
                </SignInButton>

                <Magnetic intensity={0.2}>
                  <SignInButton mode="modal">
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 group-hover:opacity-50 blur transition duration-500 group-hover:duration-200" />
                      <Button className="relative rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 px-6 font-medium text-sm transition-all group-hover:scale-[1.02] active:scale-95 shadow-sm border border-zinc-800 dark:border-white">
                        Start Validating
                      </Button>
                    </div>
                  </SignInButton>
                </Magnetic>
              </div>
            )}
          </div>

          {/* Mobile Menu Button Trigger */}
          <div className="flex md:hidden items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-zinc-500 dark:text-zinc-400"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
            {isSignedIn && <UserButton />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-2 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100dvh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden absolute top-0 left-0 w-full overflow-y-auto bg-white dark:bg-zinc-950 pt-24 pb-12 px-6 border-b border-zinc-200 dark:border-zinc-800 shadow-2xl"
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="flex flex-col gap-6 text-2xl font-semibold tracking-tight h-full"
            >
              <div className="flex-1 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      show: {
                        x: 0,
                        opacity: 1,
                        transition: { type: "spring" },
                      },
                    }}
                  >
                    <Link
                      href={link.path}
                      onClick={(e) => handleScroll(e, link.path)}
                      className={`block transition-colors ${
                        currentPath === link.path ||
                        (link.path !== "/" &&
                          link.path !== "/#" &&
                          pathname.startsWith(link.path))
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-zinc-800 dark:text-zinc-200 hover:text-indigo-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.hr
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                className="border-zinc-200 dark:border-zinc-800 origin-left mt-auto"
              />

              {!isSignedIn && (
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  className="flex flex-col gap-4 mt-6"
                >
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="w-full h-14 text-lg rounded-full border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white"
                    >
                      Log In
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button className="w-full h-14 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25">
                      Start Validating
                    </Button>
                  </SignInButton>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
