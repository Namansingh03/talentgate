"use client";

import { useState } from "react";
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

export const FilterOptions = {
  JobType: ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"],
  ExperienceLevel: ["INTERN", "JUNIOR", "MID", "SENIOR", "LEAD"],
  JobStatus: ["DRAFT", "ACTIVE", "CLOSED", "EXPIRED"],
} as const;

interface initialDataProps {
  initialData: jobViewCardType[];
}

type FilterKey = keyof typeof FilterOptions | "All";

const CompanyJobs = ({ initialData }: initialDataProps) => {
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<FilterKey>("All");
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>("All");
  const router = useRouter();
  const pathname = usePathname();

  const filterKeys: FilterKey[] = [
    "All",
    ...(Object.keys(FilterOptions) as (keyof typeof FilterOptions)[]),
  ];

  const filterValues =
    selectedFilterOption === "All"
      ? ["All"]
      : ["All", ...FilterOptions[selectedFilterOption]];

  const filters = {
    JobType: (job: jobViewCardType, value: string) => job.type === value,

    ExperienceLevel: (job: jobViewCardType, value: string) =>
      job.level === value,

    JobStatus: (job: jobViewCardType, value: string) => job.status === value,
  } as const;

  const filteredJobs = initialData.filter((job) => {
    if (selectedFilterOption === "All" || selectedFilterValue === "All") {
      return true;
    }

    return filters[selectedFilterOption](job, selectedFilterValue);
  });

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

      {/* filter options */}
      <div className="w-full flex flex-col gap-y-3">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-indigo-700 font-semibold text-sm">
            All jobs
            <span className="ml-2 text-neutral-400 font-normal">
              {initialData.length}
            </span>
          </p>

          <div className="flex flex-row gap-x-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs capitalize gap-1.5"
                >
                  <ListFilter className="size-3.5" />
                  {selectedFilterOption}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="text-sm text-neutral-700"
              >
                {filterKeys.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    className="capitalize"
                    onClick={() => setSelectedFilterOption(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs capitalize gap-1.5"
                >
                  <ListFilter className="size-3.5" />
                  {selectedFilterValue}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="text-sm text-neutral-700"
              >
                {filterValues.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    className="capitalize"
                    onClick={() => setSelectedFilterValue(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

        <JobViewCards jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default CompanyJobs;
