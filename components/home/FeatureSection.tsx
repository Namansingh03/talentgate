"use client";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs">
            Why CareerFlow
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mt-3">
            Built for modern professionals
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Big Card */}
          <div className="md:col-span-7 bg-surface-container-lowest rounded-xl p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="max-w-md relative z-10">
              <span className="material-symbols-outlined text-primary text-3xl mb-4">
                bolt
              </span>
              <h3 className="text-2xl font-semibold text-on-surface mb-3">
                Smart Job Matching
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Our AI understands your skills beyond keywords and connects you
                with roles that actually fit your growth.
              </p>
            </div>

            <div className="absolute bottom-[-30%] right-[-20%] w-72 h-56 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          {/* Verified */}
          <div className="md:col-span-5 bg-primary-container text-on-primary rounded-xl p-7 relative overflow-hidden group">
            <span className="material-symbols-outlined text-white text-3xl mb-4">
              verified_user
            </span>
            <h3 className="text-xl font-semibold mb-2">Verified Companies</h3>
            <p className="text-sm text-on-primary-container leading-relaxed">
              Every company is vetted — no spam, just real opportunities.
            </p>

            <span className="material-symbols-outlined text-white/10 text-8xl absolute -bottom-6 -right-6 group-hover:scale-110 transition">
              verified
            </span>
          </div>

          {/* Tracking */}
          <div className="md:col-span-5 bg-surface-container-highest rounded-xl p-7">
            <span className="material-symbols-outlined text-on-surface text-3xl mb-4">
              timeline
            </span>
            <h3 className="text-xl font-semibold text-on-surface mb-2">
              Real-time Tracking
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Track application status instantly — from viewed to hired.
            </p>
          </div>

          {/* Salary */}
          <div className="md:col-span-7 bg-surface-container-lowest rounded-xl p-7 flex items-center justify-between overflow-hidden">
            <div className="max-w-sm">
              <span className="material-symbols-outlined text-tertiary-container text-3xl mb-4">
                auto_awesome
              </span>
              <h3 className="text-2xl font-semibold text-on-surface mb-3">
                Salary Insights
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Know your worth with real salary benchmarks for tech roles.
              </p>
            </div>

            <div className="hidden md:block w-32 h-32 bg-tertiary-fixed/20 rounded-full shrink-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
