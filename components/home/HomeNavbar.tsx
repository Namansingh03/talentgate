"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useTheme } from "next-themes";
import ThemeToggle from "../ui/ThemeToggleBtn";

export default function HomeNavbar() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-medium text-gray-900 dark:text-white tracking-tight shrink-0"
        >
          Talent<span className="text-blue-500">Gate</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/jobs"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Browse jobs
          </Link>
          <Link
            href="/employers"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            For employers
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/signin"
            className="text-sm text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 px-6 py-2 rounded-lg transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            sign in
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
