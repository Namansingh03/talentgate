"use client";

import React from "react";
import { JobsCardType } from "@/src/features/company/types/companyPrismaTypes";
import { formatDistanceToNow, format } from "date-fns";
import { MapPin, Briefcase, Clock3, Layers3, Wifi } from "lucide-react";

type JobsListProps = {
  jobs: JobsCardType[];
};

const JobsList = ({ jobs }: JobsListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                {job.category}
              </p>

              <h2 className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">
                {job.title}
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {"job.company.name"}
              </p>
            </div>

            {job.isRemote && (
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <Wifi className="h-3.5 w-3.5" />
                Remote
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>

            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              {job.type}
            </div>

            <div className="flex items-center gap-1.5">
              <Layers3 className="h-4 w-4" />
              {job.level}
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {job.description}
          </p>

          {/* Skills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {job.skills?.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                Posted{" "}
                {formatDistanceToNow(new Date(job.createdAt), {
                  addSuffix: true,
                })}
              </div>

              {job.expiresAt && (
                <p className="mt-1">
                  Expires on {format(new Date(job.expiresAt), "dd MMM yyyy")}
                </p>
              )}
            </div>

            <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
