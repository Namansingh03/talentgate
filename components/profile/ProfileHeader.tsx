"use client";

import Image from "next/image";

export default function ProfileHeader() {
  return (
    <header className="bg-linear-to-r from-indigo-100 to-blue-100 py-20 px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-10">
        {/* LEFT: Profile + Info */}
        <div className="flex items-center gap-8">
          {/* Profile Image */}
          <div className="relative">
            <div className="h-35 w-35 rounded-2xl border-8 border-white bg-white overflow-hidden shadow-lg">
              <Image
                src="/profileImage"
                alt="profile"
                width={176}
                height={176}
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Alex Rivera</h1>

            <p className="text-lg text-gray-600 font-medium">
              Senior Software Engineer
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>📍 San Francisco, CA</span>
              <span>@arivera_dev</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
