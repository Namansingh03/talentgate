"use client";

import React, { useState } from "react";
import { ListFilter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerCard from "./BannerCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface bannerCardsInterface {
  title: string;
  value: number;
  description?: string;
}

enum Filters {
  noFilter = "no filter",
  active = "active",
  drafts = "drafts",
  closed = "closed",
  expired = "expired",
}

const filterOptions = Object.values(Filters);

const CompanyJobs = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filters>(
    Filters.noFilter,
  );
  const router = useRouter();

  const bannerCards: bannerCardsInterface[] = [
    {
      title: "total jobs",
      value: 28,
      description: "+3% this month",
    },
    {
      title: "active posting",
      value: 10,
      description: "75% this month",
    },
    {
      title: "total applicants",
      value: 20,
      description: "+12% last week",
    },
    {
      title: "average fit score",
      value: 82,
      description: "high quality",
    },
  ];

  return (
    <div className="w-full h-auto flex flex-col gap-y-10 p-8">
      <div className="w-full flex flex-row justify-between items-end">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold font-sans capitalize">
            job management
          </h1>
          <p className="capitalize text-sm mt-1 text-neutral-400">
            manage you current listing and review your candidate intake
          </p>
        </div>
        <Button
          size={"lg"}
          className="bg-indigo-700 text-white rounded-lg px-5 py-3"
        >
          <Plus />
          Post new job
        </Button>
      </div>

      {/* banner cards */}
      <div className="w-full flex flex-row items-center justify-evenly gap-x-5">
        {bannerCards.map((val) => (
          <BannerCard
            title={val.title}
            value={val.value}
            description={val.description}
            key={val.title}
          />
        ))}
      </div>

      {/* filter options  */}
      <div className="w-full flex flex-col">
        <div className="w-full mb-0 p-5 flex flex-row items-center justify-between">
          <p className="text-indigo-800 font-semibold underline underline-offset-28 decoration-3 text-md">
            all jobs
          </p>
          <div className="flex flex-col items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="text-xs">
                  <ListFilter />
                  {selectedFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-sm text-neutral-700">
                {filterOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSelectedFilter(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Todo : add sort options */}
          </div>
        </div>
        <Separator className="mt-0" />
      </div>

      <div className="w-full flex flex-col rounded-t-lg border-2 border-neutral-400">
        <div className="grid grid-cols-7 items-center px-6 py-3 rounded-t-lg bg-slate-100">
          <p className="text-sm col-span-2 font-medium capitalize text-neutral-500">
            Job Title
          </p>
          <p className="text-sm col-span-1 font-medium capitalize text-neutral-500">
            Location
          </p>
          <p className="text-sm col-span-1 font-medium capitalize text-neutral-500">
            Type
          </p>
          <p className="text-sm col-span-1 font-medium capitalize text-neutral-500">
            category
          </p>
          <p className="text-sm col-span-1 font-medium capitalize text-neutral-500">
            Status
          </p>
          <p className="text-sm font-medium capitalize text-neutral-500 text-right">
            Actions
          </p>
        </div>

        {/* jobs view */}
      </div>
    </div>
  );
};

export default CompanyJobs;
