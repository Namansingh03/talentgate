// components/layout/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Hire<span className="text-blue-500">Loop</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/about"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} TalentGate
        </p>
      </div>
    </footer>
  );
}
