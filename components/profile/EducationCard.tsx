"use client";

export default function EducationCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Education
        </p>

        <button className="text-xs text-blue-500">+ Add</button>
      </div>

      {/* Timeline */}
      <div className="ml-1">
        {/* Education 1 */}
        <div className="pl-4 relative pb-5 border-l border-gray-100">
          <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-200" />

          <div>
            <p className="text-sm font-medium text-gray-900">
              B.Tech in Computer Science
            </p>
            <p className="text-sm text-gray-500 mt-0.5">IIT Delhi</p>
            <p className="text-xs text-gray-400 mt-1">Aug 2019 – May 2023</p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Focused on software engineering, data structures, and web
              development.
            </p>
          </div>
        </div>

        {/* Education 2 */}
        <div className="pl-4 relative border-l border-transparent">
          <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-200" />

          <div>
            <p className="text-sm font-medium text-gray-900">
              Senior Secondary (PCM)
            </p>
            <p className="text-sm text-gray-500 mt-0.5">Delhi Public School</p>
            <p className="text-xs text-gray-400 mt-1">Apr 2017 – Mar 2019</p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Studied Physics, Chemistry, and Mathematics with a focus on
              problem-solving.
            </p>
          </div>
        </div>
      </div>

      {/* Static Add Form UI (for design only) */}
      <div className="mt-4 space-y-2 border-t border-gray-50 pt-4">
        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="School / University"
            className="col-span-2 text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            placeholder="Degree"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            placeholder="Field"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            type="month"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            type="month"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" />
          Currently studying here
        </label>

        <textarea
          placeholder="Description"
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none"
        />

        <div className="flex gap-2">
          <button className="text-sm px-3.5 py-1.5 rounded-lg bg-blue-500 text-white">
            Save
          </button>
          <button className="text-sm px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
