"use client";

import Link from "next/link";

export default function HomeNavbar() {
  return (
    <header className=" bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(79,70,229,0.08)] tonal-transition no-line">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <div className="flex items-center gap-12">
          <a
            className="text-2xl font-black bg-linear-to-br from-indigo-600 to-indigo-800 bg-clip-text text-transparent tracking-tight font-['Inter']"
            href="#"
          >
            Talent
            <span className=" text-indigo-400 ">Gate</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary-container text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 shadow-lg shadow-primary-container/20">
            <Link href={"signin"}>sign in</Link>
          </button>
        </div>
      </nav>
    </header>
  );
}
