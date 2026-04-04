export default function AboutCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="h-3 w-12 bg-gray-100 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-3.5 w-full bg-gray-100 rounded" />
        <div className="h-3.5 w-full bg-gray-100 rounded" />
        <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
