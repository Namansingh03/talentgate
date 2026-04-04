import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-white border-b border-gray-100 overflow-hidden z-10">
      {/* Background blobs */}
      <Image
        alt="blob"
        src="/blob.png"
        width={500}
        height={500}
        className="absolute -top-50 -left-32 blur-3xl opacity-40 z-0"
      />
      <Image
        alt="blob"
        src="/blob.png"
        width={500}
        height={500}
        className="absolute -bottom-32 -right-32 blur-3xl opacity-40 z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full 
          bg-blue-50 text-blue-800 border border-blue-100 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Now live — 1,200+ jobs posted
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-medium 
          text-gray-900 leading-tight tracking-tight mb-4"
        >
          Find your next <span className="text-blue-500">developer</span> role
        </h1>

        {/* Subtext */}
        <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md mx-auto">
          HireLoop connects talented developers with companies that value good
          engineering. Browse jobs, build your profile, and apply in minutes.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/jobs"
            className="text-sm px-5 py-2.5 rounded-xl 
            bg-blue-500 text-white hover:bg-blue-600 
            transition-colors font-medium"
          >
            Browse jobs
          </Link>

          <Link
            href="/employers"
            className="text-sm px-5 py-2.5 rounded-xl 
            border border-gray-200 text-gray-700 
            hover:bg-gray-50 transition-colors"
          >
            Post a job
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            { value: "1,200+", label: "Active jobs" },
            { value: "340+", label: "Companies" },
            { value: "8,500+", label: "Candidates" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-medium text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
