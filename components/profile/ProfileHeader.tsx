"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfileHeader() {
  const user = {
    name: "John Doe",
    image: "",
    headline: "Frontend Developer",
    location: "New York, USA",
    roles: 3,
    isOpenToWork: true,
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start">
      {/* Avatar */}
      <div className="shrink-0">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-18 h-18 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium text-xl">
            JD
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-medium text-gray-900 mb-0.5">
          {user.name}
        </h1>

        <p className="text-sm text-gray-500 mb-3">{user.headline}</p>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2.5 py-1 rounded-md bg-green-50 text-green-700">
            Open to work
          </span>

          <span className="text-xs px-2.5 py-1 rounded-md border border-gray-100 text-gray-500">
            {user.location}
          </span>

          <span className="text-xs px-2.5 py-1 rounded-md border border-gray-100 text-gray-500">
            {user.roles} roles
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 shrink-0">
        <Link
          href="/profile/edit"
          className="text-sm px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Edit profile
        </Link>

        <button className="text-sm px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
          Share
        </button>
      </div>
    </div>
  );
}
