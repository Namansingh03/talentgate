"use client";

import clsx from "clsx";
import React, { useTransition } from "react";
import { Dot, Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/src/shared/ui/badge";
import { JobType, JobCategory, JobStatus } from "@/prisma/generated/enums";
import { Button } from "@/src/shared/ui/button";
import { deleteJob } from "@/src/features/jobs/actions/deleteActions";
import { toast } from "sonner";
import { formatDate } from "@/src/shared/utils/formatDate";
import { useRouter } from "next/navigation";

interface jobViewCardProps {
  title: string;
  createdAt: Date;
  category: JobCategory;
  type: JobType;
  status: JobStatus;
  location: string;
  id: string;
}

const typeClassName = {
  FULL_TIME: "bg-green-600",
  PART_TIME: "bg-grey-600",
  INTERNSHIP: "bg-blue-600",
  CONTRACT: "bg-grey-800",
  FREELANCE: "bg-yellow-600",
};

const statusClassName = {
  DRAFT: "text-grey-600",
  ACTIVE: "text-green-600",
  CLOSED: "text-black",
  EXPIRED: "text-red-600",
};

const JobViewCards = (job: jobViewCardProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const deleteJobFn = () => {
    startTransition(async () => {
      const res = await deleteJob(job.id);
      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
        return;
      }
      router.refresh();
      return;
    });
  };

  return (
    <div className="w-full grid grid-col-8">
      <div className="flex flex-col col-span-2 gap-y-2 items-start ">
        <h1 className="capitalize text-lg text-neutral-700 font-semibold font-sans">
          {job.title}
        </h1>
        <p className="text-sm text-neutral-500">
          {job.createdAt.toDateString()}
        </p>
      </div>

      {/* location */}
      <h3 className="capitalize text-md font-medium">{job.location}</h3>

      {/* type */}
      <Badge className={clsx(typeClassName[job.type])}>{job.type}</Badge>

      {/* category */}
      <h3 className="capitalize text-md font-medium">{job.category}</h3>

      {/* status */}
      <p className={clsx(statusClassName[job.status])}>
        <Dot className={clsx(statusClassName[job.status])} />
        {job.status}
      </p>

      {/* actions */}
      <div className="flex flex-row items-center justify-center gap-x-5">
        <Button disabled={isPending} className="text-neutral-500">
          <Edit2 />
          edit
        </Button>
        <Button disabled={isPending} className="text-red-500">
          <Trash2 onClick={() => deleteJobFn()} />
          delete
        </Button>
      </div>
    </div>
  );
};

export default JobViewCards;
