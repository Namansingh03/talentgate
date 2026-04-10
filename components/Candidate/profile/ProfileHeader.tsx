"use client";

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Edit } from "lucide-react";

interface ProfileHeaderProps {
  displayName?: string | null;
  headline?: string | null;
  location?: string | null;
  username?: string | null;
  AvatarImageUrl?: string | null;
  isAvailable?: boolean;
}

export default function ProfileHeader({
  AvatarImageUrl,
  displayName,
  headline,
  isAvailable = true,
  location,
  username,
}: ProfileHeaderProps) {
  const name = displayName ?? "Unnamed User";

  return (
    <header className="relative bg-linear-to-b from-blue-500 to-blue-100 py-20 px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-10">
        <div className="flex items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-30 h-30">
              {AvatarImageUrl && (
                <Image
                  alt={`${name} profile picture`}
                  src={AvatarImageUrl}
                  className=""
                />
              )}
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">{name}</h1>

            <p className="text-lg text-gray-600 font-medium">
              {headline && (
                <>
                  <span>{headline}</span>
                  <span>,</span>
                </>
              )}

              {isAvailable && (
                <span className="ml-2 text-sm text-green-700">
                  🟢 Available for work
                </span>
              )}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              {location && <span>{location}</span>}
              {username && <span>@{username}</span>}
            </div>
          </div>
        </div>
      </div>

      <Edit className="absolute top-10 right-10 text-neutral-700 cursor-pointer" />
    </header>
  );
}
