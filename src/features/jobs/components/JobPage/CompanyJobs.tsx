"use client";

import { useState } from "react";
import BannerCard from "./BannerCard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdown-menu";
import JobViewCards from "./JobViewCards";
import { Button } from "@/src/shared/ui/button";
import { ListFilter, Plus } from "lucide-react";
import { Separator } from "@/src/shared/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { jobViewCardType } from "../../types/JobTypes";

interface bannerCardsInterface {
  title: string;
  value: number;
  description?: string;
}

enum Filters {
  noFilter = "all",
  active = "active",
  drafts = "drafts",
  closed = "closed",
  expired = "expired",
}

const filterOptions = Object.values(Filters);

interface initialDataProps {
  initialData: jobViewCardType[];
}

const CompanyJobs = ({ initialData }: initialDataProps) => {
  const [selectedFilter, setSelectedFilter] = useState<Filters>(
    Filters.noFilter,
  );
  const router = useRouter();
  const pathname = usePathname();

  const bannerCards: bannerCardsInterface[] = [
    { title: "total jobs", value: 28, description: "+3% this month" },
    { title: "active postings", value: 10, description: "75% this month" },
    { title: "total applicants", value: 20, description: "+12% last week" },
    { title: "average fit score", value: 82, description: "high quality" },
  ];

  return (
    <div className="w-full h-auto flex flex-col gap-y-8 p-8">
      <div className="w-full flex flex-row justify-between items-end">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 capitalize">
            Job management
          </h1>
          <p className="text-sm text-neutral-500">
            Manage your current listings and review your candidate intake
          </p>
        </div>
        <Button
          size="lg"
          className="bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg px-5 shadow-sm"
          onClick={() => router.push(`${pathname}/createJob`)}
        >
          <Plus className="size-4" />
          Post new job
        </Button>
      </div>

      {/* banner cards */}
      <div className="w-full grid grid-cols-4 gap-4">
        {bannerCards.map((val) => (
          <BannerCard
            title={val.title}
            value={val.value}
            description={val.description}
            key={val.title}
          />
        ))}
      </div>

      {/* filter options */}
      <div className="w-full flex flex-col gap-y-3">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-indigo-700 font-semibold text-sm">
            All jobs
            <span className="ml-2 text-neutral-400 font-normal">
              {initialData.length}
            </span>
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs capitalize gap-1.5"
              >
                <ListFilter className="size-3.5" />
                {selectedFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="text-sm text-neutral-700"
            >
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  className="capitalize"
                  onClick={() => setSelectedFilter(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator />
      </div>

      <div className="w-full flex flex-col gap-y-3">
        <div className="grid grid-cols-9 items-center px-6">
          <p className="text-xs col-span-2 font-medium uppercase tracking-wide text-neutral-400">
            Job title
          </p>
          <p className="text-xs col-span-1 font-medium uppercase tracking-wide text-neutral-400">
            Location
          </p>
          <p className="text-xs col-span-1 font-medium uppercase tracking-wide text-neutral-400">
            Type
          </p>
          <p className="text-xs col-span-1 font-medium uppercase tracking-wide text-neutral-400">
            Level
          </p>
          <p className="text-xs col-span-1 font-medium uppercase tracking-wide text-neutral-400">
            Category
          </p>
          <p className="text-xs col-span-1 font-medium uppercase tracking-wide text-neutral-400">
            Status
          </p>
          <p className="text-xs col-span-2 font-medium uppercase tracking-wide text-neutral-400 text-right">
            Actions
          </p>
        </div>

        <JobViewCards jobs={initialData} />
      </div>
    </div>
  );
};

export default CompanyJobs;
