"use client";

import Link from "next/link";

export default function HomeNavbar() {
  return (
    <header className="bg-white/80 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <Link
          href="/"
          className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-600 to-indigo-800"
        >
          Talent<span className="text-indigo-400">Gate</span>
        </Link>

        <div>
          <Link
            href="/signin"
            className="bg-primary-container text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 shadow-lg shadow-primary-container/20"
          >
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
