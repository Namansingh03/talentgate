"use client";

import Image from "next/image";
import React from "react";
import { UserCircle } from "lucide-react";
import { JsonValue } from "@prisma/client/runtime/client";
import { useRouter } from "next/navigation";

interface CompanyViewCardProps {
  banner?: string | null;
  logo?: string | null;
  name: string;
  createdAt: Date;
  email: string | null;
  slug: string;
}

const CompanyViewCard = ({
  createdAt,
  email,
  name,
  slug,
  banner,
  logo,
}: CompanyViewCardProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col border-2 border-indigo-300 shadow-dm rounded-lg">
      <div className="flex flex-row items-center p-3 bg-white/30 gap-x-2">
        {logo ? (
          <Image
            src={logo}
            alt="logoImage"
            width={70}
            height={70}
            className="rounded-full"
          />
        ) : (
          <UserCircle className="w-20 h-20 rounded-full " />
        )}
        <div
          className="flex flex-col gap-y-0.5 cursor-pointer"
          onClick={() => router.push(`/${slug}/companySlug`)}
        >
          <h1 className="text-lg text-neutral-600 font-bold capitalize">
            {name}
          </h1>
          <h1 className="text-sm text-neutral-500 font-bold capitalize">
            {email}
          </h1>
          <h1 className="text-muted-foreground text-xs">
            {createdAt.toLocaleDateString()}
          </h1>
        </div>
      </div>
      {banner ? (
        <Image
          alt="bannerImage"
          src={banner}
          width={300}
          height={100}
          className="rounded-b-lg w-full h-50 bg-cover"
        />
      ) : (
        "banner"
      )}
    </div>
  );
};

export default CompanyViewCard;
