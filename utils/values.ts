export const SPECIALIZATIONS = [
  // Core Development
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",

  // Mobile & Platform
  "Mobile App Developer",
  "Android Developer",
  "iOS Developer",
  "Cross Platform Developer",

  // Data & AI
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "AI Engineer",
  "Deep Learning Engineer",
  "NLP Engineer",
  "Computer Vision Engineer",

  // Cloud & DevOps
  "DevOps Engineer",
  "Cloud Engineer",
  "Site Reliability Engineer (SRE)",
  "Platform Engineer",
  "Infrastructure Engineer",

  // UI/UX & Design
  "UI Developer",
  "UX Designer",
  "Product Designer",
] as const;

export const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Spring Boot",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "AWS",
  "Azure",
  "Google Cloud",
  "Terraform",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Flutter",
  "React Native",
  "Kotlin",
  "Swift",
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "Pandas",
  "NumPy",
  "Git",
  "Linux",
  "REST API",
  "GraphQL",
  "Microservices",
  "System Design",
  "Data Structures",
  "Algorithms",
];

import {
  JobCategory,
  JobType,
  ExperienceLevel,
} from "@/app/generated/prisma/client";

export const CardJobs = [
  {
    category: JobCategory.ENGINEERING,
    createdAt: new Date("2026-05-20"),
    description:
      "We are looking for a skilled React developer to build modern and scalable web applications.",
    expiresAt: new Date("2026-06-20"),
    isRemote: true,
    level: ExperienceLevel.MID,
    location: "Bangalore, India",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    title: "Frontend Developer",
    type: JobType.FULL_TIME,
  },

  {
    category: JobCategory.DESIGN,
    createdAt: new Date("2026-05-12"),
    description:
      "Seeking a creative UI/UX designer with experience in SaaS dashboards and mobile-first interfaces.",
    expiresAt: new Date("2026-06-10"),
    isRemote: true,
    level: ExperienceLevel.JUNIOR,
    location: "Remote",
    skills: ["Figma", "UI Design", "UX Research"],
    title: "UI/UX Designer",
    type: JobType.CONTRACT,
  },

  {
    category: JobCategory.DEVOPS,
    createdAt: new Date("2026-05-15"),
    description:
      "Help us automate deployments and improve CI/CD pipelines for enterprise applications.",
    expiresAt: new Date("2026-06-25"),
    isRemote: true,
    level: ExperienceLevel.JUNIOR,
    location: "Pune, India",
    skills: ["AWS", "Docker", "Kubernetes"],
    title: "DevOps Engineer",
    type: JobType.FREELANCE,
  },

  {
    category: JobCategory.DATA,
    createdAt: new Date("2026-05-08"),
    description:
      "Analyze datasets, create ML models, and generate business insights.",
    expiresAt: new Date("2026-06-30"),
    isRemote: true,
    level: ExperienceLevel.INTERN,
    location: "Remote",
    skills: ["Python", "Pandas", "SQL"],
    title: "Data Scientist",
    type: JobType.INTERNSHIP,
  },
];
