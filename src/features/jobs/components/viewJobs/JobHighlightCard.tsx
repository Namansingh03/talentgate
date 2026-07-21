"use client";

import { Separator } from "@/src/shared";
import clsx from "clsx";
import {
  BadgeCheck,
  Dot,
  Clock1,
  TrendingUp,
  MapPin,
  Banknote,
} from "lucide-react";
import Image from "next/image";

interface JobHighlightCardProps {
  companyName: string;
  verified: boolean;
  title: string;
  location: string;
  workType: string;
  level: string;
  minSalary: number | null;
  maxSalary: number | null;
  salaryCurrency: string;
  skills: string[];
  logo: string | null;
  isRemote: boolean;
}

const JobHighlightCard = ({
  companyName,
  level,
  location,
  maxSalary,
  minSalary,
  salaryCurrency,
  skills,
  title,
  verified,
  workType,
  isRemote,
  logo,
}: JobHighlightCardProps) => {
  const salaryRange =
    salaryCurrency +
    minSalary?.toString() +
    " - " +
    salaryCurrency +
    maxSalary?.toString();

  return (
    <div
      className={clsx(
        "flex flex-col border border-indigo-300 rounded-lg shadow-md p-5 gap-y-5",
      )}
    >
      <div className="w-full flex flex-row gap-x-5">
        <section className="h-full">
          {logo ? (
            <Image
              alt="companyLogo"
              src={logo}
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            "logo"
          )}
        </section>
        <div className="flex flex-col items-start gap-y-3">
          <h1 className="text-2xl font-medium font-sans capitalize">
            <span>{companyName}</span>
            {verified ? <BadgeCheck className="text-indigo-700" /> : ""}
          </h1>
          <h1 className="text-4xl font-bold capitalize">{title}</h1>

          <div className="flex flex-row text-sm gap-x-5 items-center text-muted-foreground justify-between">
            <span className="text-neutral-600 text-sm flex flex-row items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <p>{location}</p>
            </span>
            <p className="text-neutral-600 text-sm">
              {isRemote && (
                <span>
                  <Dot className="text-indigo-500" />
                  isRemote
                </span>
              )}
            </p>
            <span className="text-neutral-600 text-sm flex flex-row items-center">
              <Clock1 className="w-4 h-4 mr-1" />
              <p className="capitalize">{workType.toLocaleLowerCase()}</p>
            </span>
            <span className="text-neutral-600 text-sm flex flex-row items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              <p className="capitalize">{level.toLocaleLowerCase()}</p>
            </span>
          </div>

          <span className="text-md font-semibold flex flex-row items-centre">
            <Banknote className="w-6 h-6 mr-2" />
            <p>{salaryRange}</p>
          </span>
        </div>
      </div>
      <Separator className="" />
      <div className={clsx(`flex flex-col gap-y-2`)}>
        <h1 className="uppercase font-semibold text-sm text-neutral-500">
          Required tech stack
        </h1>
        <div className="flex flex-row gap-x-3 p-2 ">
          {skills.map((skill, i) => (
            <p
              className="px-5 col-span-1 py-3 rounded-lg bg-indigo-200 text-indigo-900 font-semibold"
              key={i}
            >
              {skill}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobHighlightCard;
