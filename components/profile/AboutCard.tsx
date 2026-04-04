"use client";

export default function AboutCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          About
        </p>

        <button className="text-xs text-blue-500 hover:text-blue-600">
          Edit
        </button>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 leading-relaxed">
        I am a passionate frontend developer with experience in building modern
        web applications using React, Next.js, and Tailwind CSS. I enjoy
        creating clean UI, solving real-world problems, and continuously
        learning new technologies.
      </p>

      {/* Static Edit Section (for UI only) */}
      <div className="mt-4 space-y-3">
        <textarea
          defaultValue="I am a passionate frontend developer with experience in building modern web applications..."
          rows={4}
          className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2.5 resize-none"
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
