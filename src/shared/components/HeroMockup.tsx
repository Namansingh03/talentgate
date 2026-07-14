"use client";

export function HeroMockup() {
  return (
    <div className="lg:col-span-5 relative">
      <div className="relative z-10 bg-surface-container-lowest/70 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-32 bg-surface-container-high rounded-md"></div>
          <div className="h-8 w-8 bg-primary/10 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-on-surface rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-outline-variant rounded"></div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-surface-container">
            <div className="h-20 w-full bg-surface-container-high rounded-xl opacity-50"></div>
          </div>
        </div>
      </div>

      <div className="absolute -top-10 -right-10 bg-tertiary-fixed-dim/20 w-32 h-32 rounded-full blur-2xl"></div>
    </div>
  );
}
