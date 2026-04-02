import { getLatestJobs } from "@/utils/DummyJobs";
import Link from "next/link";

type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "FREELANCE";
type ExperienceLevel = "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "LEAD";

const jobTypeLabel: Record<JobType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

const levelLabel: Record<ExperienceLevel, string> = {
  INTERN: "Intern",
  JUNIOR: "Junior",
  MID: "Mid-level",
  SENIOR: "Senior",
  LEAD: "Lead",
};

function formatSalary(
  min: number | null,
  max: number | null,
  currency: string,
) {
  if (!min && !max) return null;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return null;
}

function CompanyInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="w-10 h-10 rounded-xl 
    bg-gray-50 dark:bg-gray-800 
    border border-gray-100 dark:border-gray-700 
    flex items-center justify-center 
    text-xs font-medium text-gray-500 dark:text-gray-400 shrink-0"
    >
      {initials}
    </div>
  );
}

export default async function LatestJobsSection() {
  const jobs = await getLatestJobs();

  return (
    <section className="bg-white dark:bg-gray-900 border-t border-b border-gray-100 dark:border-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              Jobs
            </p>
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
              Latest openings
            </h2>
          </div>

          <Link
            href="/jobs"
            className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            View all →
          </Link>
        </div>

        {jobs.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No jobs posted yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jobs.map((job) => {
              const salary = formatSalary(
                job.salaryMin,
                job.salaryMax,
                job.salaryCurrency,
              );

              return (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug}`}
                  className="bg-white dark:bg-gray-800 
                  border border-gray-100 dark:border-gray-700 
                  rounded-2xl p-4 flex flex-col gap-3 
                  hover:border-gray-200 dark:hover:border-gray-600 
                  hover:bg-gray-50/50 dark:hover:bg-gray-800/80 
                  transition-colors"
                >
                  {/* Company */}
                  <div className="flex items-center gap-3">
                    <CompanyInitials name={job.company.name} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {job.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {job.company.name}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className="text-xs px-2 py-0.5 rounded-md 
                    bg-blue-50 dark:bg-blue-900/30 
                    text-blue-800 dark:text-blue-300 
                    border border-blue-100 dark:border-blue-800"
                    >
                      {jobTypeLabel[job.type as JobType]}
                    </span>

                    {job.isRemote && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-md 
                      bg-green-50 dark:bg-green-900/30 
                      text-green-800 dark:text-green-300 
                      border border-green-100 dark:border-green-800"
                      >
                        Remote
                      </span>
                    )}

                    <span
                      className="text-xs px-2 py-0.5 rounded-md 
                    bg-gray-50 dark:bg-gray-700 
                    text-gray-600 dark:text-gray-300 
                    border border-gray-100 dark:border-gray-600"
                    >
                      {levelLabel[job.level as ExperienceLevel]}
                    </span>

                    {job.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 rounded-md 
                        bg-gray-50 dark:bg-gray-700 
                        text-gray-600 dark:text-gray-300 
                        border border-gray-100 dark:border-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Salary */}
                  {salary && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Salary:{" "}
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {salary}
                      </span>
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
