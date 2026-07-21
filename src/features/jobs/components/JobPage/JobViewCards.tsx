"use client";

import JobCard from "./JobCard";
import { jobViewCardType } from "../../types/JobTypes";

interface JobViewCardsProps {
  jobs: jobViewCardType[];
}

const JobViewCards = ({ jobs }: JobViewCardsProps) => {
  if (jobs.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-center gap-y-1">
        <p className="text-sm font-medium text-neutral-600">No jobs yet</p>
        <p className="text-xs text-neutral-400">
          Jobs you post will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3">
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
};

export default JobViewCards;
