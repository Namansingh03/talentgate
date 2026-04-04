export default function TimelineCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="h-3 w-24 bg-gray-100 rounded mb-5" />

      <div className="ml-1 space-y-0">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="pl-4 relative pb-5 border-l border-gray-100 last:border-transparent last:pb-0"
          >
            {/* Dot */}
            <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-200" />
            {/* Lines */}
            <div className="space-y-2">
              <div className="h-3.5 w-36 bg-gray-100 rounded" />
              <div className="h-3 w-28 bg-gray-100 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-4/5 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
