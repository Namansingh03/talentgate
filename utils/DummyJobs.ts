// lib/dummyJobs.ts

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "FREELANCE";

export type ExperienceLevel = "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "LEAD";

export interface Job {
  id: string;
  title: string;
  slug: string;
  location: string;
  isRemote: boolean;
  type: JobType;
  level: ExperienceLevel;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  skills: string[];
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  company: {
    name: string;
    slug: string;
    logo: string | null;
  };
}

export const dummyJobs: Job[] = [
  {
    id: "job_1",
    title: "Frontend Developer",
    slug: "frontend-developer-react",
    location: "Bangalore, India",
    isRemote: true,
    type: "FULL_TIME",
    level: "MID",
    salaryMin: 800000,
    salaryMax: 1400000,
    salaryCurrency: "INR",
    skills: ["React", "TypeScript", "Tailwind"],
    status: "ACTIVE",
    createdAt: "2026-03-30T10:00:00.000Z",
    company: {
      name: "TechNova",
      slug: "technova",
      logo: null,
    },
  },
  {
    id: "job_2",
    title: "Backend Engineer",
    slug: "backend-engineer-node",
    location: "Hyderabad, India",
    isRemote: false,
    type: "FULL_TIME",
    level: "SENIOR",
    salaryMin: 1500000,
    salaryMax: 2500000,
    salaryCurrency: "INR",
    skills: ["Node.js", "Prisma", "PostgreSQL"],
    status: "ACTIVE",
    createdAt: "2026-03-29T12:00:00.000Z",
    company: {
      name: "CodeForge",
      slug: "codeforge",
      logo: null,
    },
  },
  {
    id: "job_3",
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    location: "Remote",
    isRemote: true,
    type: "CONTRACT",
    level: "JUNIOR",
    salaryMin: 400000,
    salaryMax: 700000,
    salaryCurrency: "INR",
    skills: ["Figma", "UX Research"],
    status: "ACTIVE",
    createdAt: "2026-03-28T09:00:00.000Z",
    company: {
      name: "Designly",
      slug: "designly",
      logo: null,
    },
  },
  {
    id: "job_4",
    title: "Full Stack Developer",
    slug: "fullstack-developer",
    location: "Delhi, India",
    isRemote: false,
    type: "FULL_TIME",
    level: "MID",
    salaryMin: 1000000,
    salaryMax: 1800000,
    salaryCurrency: "INR",
    skills: ["Next.js", "MongoDB"],
    status: "ACTIVE",
    createdAt: "2026-03-27T15:00:00.000Z",
    company: {
      name: "StackBuild",
      slug: "stackbuild",
      logo: null,
    },
  },
];

export async function getLatestJobs() {
  return dummyJobs
    .filter((job) => job.status === "ACTIVE")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);
}
