"use client";

import { CompanyType } from "@/types/CompanyTyes";
import { Button } from "@react-email/components";
import { CheckCircle2Icon, ImageIcon, SlashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CompanyPage = ({ data }: { data: CompanyType }) => {
  const {
    banner,
    createdAt,
    description,
    industry,
    isVerified,
    linkedin,
    location,
    logo,
    members,
    name,
    size,
    website,
  } = data;

  return (
    <div className="w-full h-screen p-8 flex flex-col items-center justify-center">
      {banner ? (
        <Image
          src={banner}
          alt="bannerImage"
          width={100}
          height={100}
          className="w-full h-40 rounded-md relative z-0"
        />
      ) : (
        <div className="w-full h-40 border border-dashed rounded-md flex items-center justify-center bg-muted relative z-0">
          <ImageIcon className="w-10 h-10 text-muted-foreground" />
        </div>
      )}

      <div className="w-full flex flex-row items-center justify-between bg-white">
        {logo ? (
          <Image
            src={logo}
            alt="logoImage"
            width={100}
            height={100}
            className="w-20 h-20 rounded-md"
          />
        ) : (
          <div className="w-20 h-20 border border-dashed rounded-md flex items-center justify-center bg-muted">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
          </div>
        )}

        <div className="w-auto h-auto flex flex-col items-start justify-center">
          <h1 className="font-serif text-3xl font-bold text-neutral-900">
            {name}
            <span>
              {isVerified && (
                <CheckCircle2Icon className="w-10 h-10 text-blue-700" />
              )}
            </span>
          </h1>

          <div className="flex items-center justify-center flex-row">
            <p className="font-semibold font-sans text-lg">{industry}</p>
            <SlashIcon className="text-neutral-600 w-10 h-10" />
            <p className="text-neutral-600 text-md">{location}</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <Link
              className="px-8 py-5 rounded-xl bg-blue-900 text-white shadow-md"
              href={website ?? ""}
            >
              website
            </Link>
            <Link
              className="px-8 py-5 rounded-xl text-blue-900 bg-neutral-400 shadow-md"
              href={linkedin ?? ""}
            >
              Linkedin
            </Link>
          </div>
        </div>

        <div className="w-full grid grid-col-2">
          <div className="w-xl flex flex-col items-center justify-center gap-y-8">
            <div className="flex items-start flex-col gap-y-8">
              <h1 className="text-xl font-semibold">
                about <span>{name}</span>
              </h1>
              <p className="text-neutral-500 text-md">{description}</p>
            </div>
            <div className="bg-transparent flex flex-col items-center gap-y-5">
              <div className="w-full flex flex-row items-center justify-between">
                <h1 className="text-xl font-semibold">Open roles at {name}</h1>
                <p className="text-blue-600 text-sm font-semibold">
                  available positions
                </p>
              </div>
            </div>
          </div>

          <div className="w-lg flex flex-col "></div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
