"use client";

export default function ExperienceCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Work experience
        </p>

        <button className="text-xs text-blue-500">+ Add</button>
      </div>

      {/* Timeline */}
      <div className="ml-1">
        {/* Experience 1 */}
        <div className="pl-4 relative pb-5 border-l border-gray-100">
          <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-200" />

          <div>
            <p className="text-sm font-medium text-gray-900">
              Frontend Developer
            </p>
            <p className="text-sm text-gray-500 mt-0.5">Google · Remote</p>
            <p className="text-xs text-gray-400 mt-1">Jan 2023 – Present</p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Building scalable UI with React and improving performance across
              web apps.
            </p>
          </div>
        </div>

        {/* Experience 2 */}
        <div className="pl-4 relative border-l border-transparent">
          <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-gray-200" />

          <div>
            <p className="text-sm font-medium text-gray-900">UI Developer</p>
            <p className="text-sm text-gray-500 mt-0.5">Amazon · Bangalore</p>
            <p className="text-xs text-gray-400 mt-1">Jun 2021 – Dec 2022</p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Worked on internal dashboards and optimized UI performance.
            </p>
          </div>
        </div>
      </div>

      {/* Static Add Form UI (for design only) */}
      <div className="mt-4 space-y-2 border-t border-gray-50 pt-4">
        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="Job title"
            className="col-span-2 text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            placeholder="Company"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            placeholder="Location"
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
          Currently working here
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
