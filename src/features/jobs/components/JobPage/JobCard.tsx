"use client";

import clsx from "clsx";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/ui/button";
import { Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { jobViewCardType } from "../../types/JobTypes";
import { formatDate } from "@/src/shared/utils/formatDate";
import { deleteJob } from "@/src/features/jobs/actions/deleteActions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/shared";

const typeStyles: Record<string, string> = {
  FULL_TIME: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  PART_TIME: "bg-sky-50 text-sky-700 ring-sky-600/20",
  INTERNSHIP: "bg-violet-50 text-violet-700 ring-violet-600/20",
  CONTRACT: "bg-amber-50 text-amber-700 ring-amber-600/20",
  FREELANCE: "bg-pink-50 text-pink-700 ring-pink-600/20",
};

const statusStyles: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600 ring-gray-400/30",
  ACTIVE: "bg-green-50 text-green-700 ring-green-600/20",
  CLOSED: "bg-slate-100 text-slate-700 ring-slate-500/20",
  EXPIRED: "bg-red-50 text-red-600 ring-red-600/20",
};

const statusDot: Record<string, string> = {
  DRAFT: "bg-gray-400",
  ACTIVE: "bg-green-500",
  CLOSED: "bg-slate-500",
  EXPIRED: "bg-red-500",
};

interface JobCardProps {
  job: jobViewCardType;
}

const JobCard = ({ job }: JobCardProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteJob(job.id);
      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
        return;
      }
      toast.success("Job deleted");
      router.refresh();
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-9 items-center gap-x-2 px-6 py-4 border border-neutral-200 rounded-lg bg-white transition-colors hover:bg-neutral-50/80",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      <div className="flex flex-col col-span-2 gap-y-0.5 min-w-0">
        <h3 className="text-sm font-semibold text-neutral-800 capitalize truncate">
          {job.title}
        </h3>
        <p className="text-xs text-neutral-400">
          Posted {job.createdAt.toLocaleDateString()}
        </p>
      </div>

      <p className="col-span-1 text-sm text-neutral-600 truncate">
        {job.location}
      </p>

      <span
        className={clsx(
          "col-span-1 w-fit text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset capitalize",
          typeStyles[job.type] ??
            "bg-neutral-100 text-neutral-600 ring-neutral-400/20",
        )}
      >
        {job.type.replace("_", " ").toLowerCase()}
      </span>

      <p className="col-span-1 text-sm text-neutral-600 capitalize">
        {job.level.toLowerCase()}
      </p>

      <p className="col-span-1 text-sm text-neutral-600 capitalize truncate">
        {job.category.toLowerCase()}
      </p>

      <span
        className={clsx(
          "col-span-1 w-fit inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset capitalize",
          statusStyles[job.status] ??
            "bg-neutral-100 text-neutral-600 ring-neutral-400/20",
        )}
      >
        <span
          className={clsx("size-1.5 rounded-full", statusDot[job.status])}
        />
        {job.status.toLowerCase()}
      </span>

      <div className="col-span-2 flex items-center justify-end gap-0.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-500 hover:text-neutral-900"
              onClick={() => router.push(`jobs/${job.id}/view`)}
            >
              <Eye className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View job</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-500 hover:text-indigo-700"
              onClick={() => router.push(`jobs/${job.id}/edit`)}
            >
              <Edit className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit job</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-500 hover:text-red-600"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete job</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default JobCard;
