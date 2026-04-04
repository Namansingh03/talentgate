export default function ProfileHeaderSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-5 items-start animate-pulse">
      {/* Avatar */}
      <div className="w-18 h-18 rounded-full bg-gray-100 shrink-0" />

      {/* Info */}
      <div className="flex-1 space-y-2.5">
        <div className="h-5 w-40 bg-gray-100 rounded-md" />
        <div className="h-4 w-56 bg-gray-100 rounded-md" />
        <div className="flex gap-2 mt-1">
          <div className="h-6 w-24 bg-gray-100 rounded-md" />
          <div className="h-6 w-20 bg-gray-100 rounded-md" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <div className="h-8 w-24 bg-gray-100 rounded-lg" />
        <div className="h-8 w-16 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}
