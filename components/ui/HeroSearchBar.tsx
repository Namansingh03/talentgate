"use client";

export function HeroSearchBar() {
  return (
    <div className="bg-surface-container-lowest p-2 rounded-xl shadow-2xl shadow-primary/5 flex flex-col md:flex-row gap-2">
      <div className="flex-1 flex items-center px-4 py-3 gap-3">
        <span className="material-symbols-outlined text-outline">search</span>
        <input
          className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-medium placeholder:text-outline"
          placeholder="Job title, keywords..."
        />
      </div>

      <div className="w-px bg-surface-container h-8 self-center hidden md:block" />

      <div className="flex-1 flex items-center px-4 py-3 gap-3">
        <span className="material-symbols-outlined text-outline">
          location_on
        </span>
        <input
          className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-medium placeholder:text-outline"
          placeholder="San Francisco, CA"
        />
      </div>

      <button className="bg-primary-container text-on-primary px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all">
        Search Jobs
      </button>
    </div>
  );
}
