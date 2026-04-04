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
      bg-surface-container-highest
      border border-black/5
      flex items-center justify-center 
      text-xs font-semibold text-on-surface-variant shrink-0"
    >
      {initials}
    </div>
  );
}

export default async function LatestJobsSection() {
  const jobs = await getLatestJobs();

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Jobs
            </p>
            <h2 className="text-3xl font-bold text-on-surface tracking-tight">
              Latest openings
            </h2>
          </div>

          <Link
            href="/jobs"
            className="text-sm text-primary hover:opacity-80 transition"
          >
            View all →
          </Link>
        </div>

        {/* Content */}
        {jobs.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No jobs posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  className="group bg-surface-container-lowest 
                  border border-black/5 
                  rounded-xl p-5 flex flex-col gap-4 
                  hover:-translate-y-1 hover:shadow-lg 
                  transition-all duration-200"
                >
                  {/* Top */}
                  <div className="flex items-center gap-3">
                    <CompanyInitials name={job.company.name} />
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-on-surface truncate">
                        {job.title}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {job.company.name}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                      {jobTypeLabel[job.type as JobType]}
                    </span>

                    {job.isRemote && (
                      <span className="text-xs px-2.5 py-1 rounded-md bg-green-100 text-green-700">
                        Remote
                      </span>
                    )}

                    <span className="text-xs px-2.5 py-1 rounded-md bg-black/5 text-on-surface-variant">
                      {levelLabel[job.level as ExperienceLevel]}
                    </span>

                    {job.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-md bg-black/5 text-on-surface-variant"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Salary */}
                  {salary && (
                    <p className="text-sm text-on-surface-variant">
                      Salary{" "}
                      <span className="text-on-surface font-medium">
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
