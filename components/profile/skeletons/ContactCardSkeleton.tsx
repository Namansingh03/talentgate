export default function ContactCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      {/* Title */}
      <div className="h-3 w-16 bg-gray-100 rounded mb-5" />

      {/* Rows */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center py-1">
            <div className="h-3.5 w-16 bg-gray-100 rounded" />
            <div className="h-3.5 w-28 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
