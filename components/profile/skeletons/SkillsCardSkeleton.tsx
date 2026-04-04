export default function SkillsCardSkeleton() {
  const widths = [
    "w-14",
    "w-20",
    "w-16",
    "w-24",
    "w-12",
    "w-18",
    "w-16",
    "w-20",
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="h-3 w-12 bg-gray-100 rounded mb-4" />
      <div className="flex flex-wrap gap-2">
        {widths.map((w, i) => (
          <div key={i} className={`h-6 ${w} bg-gray-100 rounded-md`} />
        ))}
      </div>
    </div>
  );
}
