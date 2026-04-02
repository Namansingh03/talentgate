export default function LatestJobsSkeleton() {
  return (
    <section className="bg-white dark:bg-gray-900 border-t border-b border-gray-100 dark:border-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-2 animate-pulse">
            <div className="h-3 w-10 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-6 w-40 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Job cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 
              border border-gray-100 dark:border-gray-700 
              rounded-2xl p-4 flex flex-col gap-3 animate-pulse"
            >
              {/* Company row */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 shrink-0" />

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-3.5 w-40 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-24 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded-md" />
                <div className="h-5 w-14 bg-gray-100 dark:bg-gray-700 rounded-md" />
                <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded-md" />
              </div>

              {/* Salary */}
              <div className="h-3 w-32 bg-gray-100 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
