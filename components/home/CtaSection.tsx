import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-medium text-gray-900 dark:text-white tracking-tight mb-3">
          Ready to find your next role?
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          Join thousands of developers already using HireLoop to land their next
          job or hire great engineers.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/register"
            className="text-sm px-5 py-2.5 rounded-xl 
            bg-blue-500 text-white 
            hover:bg-blue-600 
            transition-colors font-medium"
          >
            Create free account
          </Link>

          <Link
            href="/jobs"
            className="text-sm px-5 py-2.5 rounded-xl 
            border border-gray-200 dark:border-gray-700 
            text-gray-700 dark:text-gray-300 
            hover:bg-gray-50 dark:hover:bg-gray-800 
            transition-colors"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
