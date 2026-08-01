"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export function HistorySearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard navigation: Press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const query = searchParams.get("q") || "";

    if (query !== searchQuery) {
      startTransition(() => {
        setSearchQuery(query);
      });
    }
  }, [searchParams, searchQuery, startTransition]);

  // Debounced search to prevent spamming the database on every keystroke
  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchQuery(term);
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, 300);

  return (
    <div className="relative max-w-md w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {isPending ? (
          <Loader2 className="h-5 w-5 text-violet-500 animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-violet-500 transition-colors" />
        )}
      </div>
      <input
        ref={searchInputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search your ideas..."
        className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-12 pr-12 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-sm transition-all"
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
          /
        </kbd>
      </div>
    </div>
  );
}
