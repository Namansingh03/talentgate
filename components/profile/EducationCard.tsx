"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfileHeader() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start">
      {/* Avatar */}
      <div className="shrink-0">
        {/* {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-[72px] h-[72px] rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium text-xl select-none">
            {"initials"}
          </div>
        )} */}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-medium text-gray-900 mb-0.5">
          {"user.name"}
        </h1>

        {/* {profile.headline && ( */}
        <p className="text-sm text-gray-500 mb-3">{"profile.headline"}</p>
        {/* )} */}

        <div className="flex flex-wrap gap-2">
          {/* Open to work toggle for owner, badge for visitor */}
          {/* {isOwner ? ( */}
          {/* <button
              onClick={handleToggleOpenToWork}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                isOpen
                  ? "bg-green-50 text-green-700 hover:bg-green-100"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {isOpen ? "✓ Open to work" : "Not open to work"}
            </button>
          ) : ( */}
          isOpen && (
          <span className="text-xs px-2.5 py-1 rounded-md bg-green-50 text-green-700">
            Open to work
          </span>
          ){/* )} */}
          {/* {profile.location && ( */}
          <span className="text-xs px-2.5 py-1 rounded-md border border-gray-100 text-gray-500">
            {"profile.location"}
          </span>
          {/* )} */}
          {/* {profile.experience.length > 0 && ( */}
          <span className="text-xs px-2.5 py-1 rounded-md border border-gray-100 text-gray-500">
            {"profile.experience.length"} {"roles"}
          </span>
          {/* )} */}
        </div>
      </div>

      {/* Actions */}
      {/* {isOwner && ( */}
      <div className="flex gap-2 shrink-0">
        <Link
          href="/profile/edit"
          className="text-sm px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Edit profile
        </Link>
        <button
          onClick={}
          className="text-sm px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {"share"}
        </button>
      </div>
    </div>
  );
}
