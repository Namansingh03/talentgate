// prisma/seed.ts

import prismaDb from "@/lib/db";

async function main() {
  // Replace with an existing CandidateProfile id from your DB
  const profileId = "cmo4aiuwn000091vgu55dhkae";

  // Clear old data for this profile (optional)
  await prismaDb.education.deleteMany({
    where: { profileId },
  });

  await prismaDb.workExperience.deleteMany({
    where: { profileId },
  });

  // -------------------------
  // EDUCATION DATA
  // -------------------------
  await prismaDb.education.createMany({
    data: [
      {
        profileId,
        school: "Delhi Public School",
        degree: "High School",
        field: "Science",
        startDate: new Date("2016-04-01"),
        endDate: new Date("2018-03-31"),
        isCurrent: false,
        marksObtained: "88%",
      },
      {
        profileId,
        school: "Dr. A.P.J Abdul Kalam Technical University",
        degree: "Bachelor of Technology",
        field: "Computer Science",
        startDate: new Date("2018-08-01"),
        endDate: new Date("2022-06-30"),
        isCurrent: false,
        marksObtained: "8.4 CGPA",
      },
      {
        profileId,
        school: "Coursera / Udemy",
        degree: "Certification",
        field: "Full Stack Web Development",
        startDate: new Date("2023-01-01"),
        endDate: null,
        isCurrent: true,
        marksObtained: null,
      },
    ],
  });

  // -------------------------
  // WORK EXPERIENCE DATA
  // -------------------------
  await prismaDb.workExperience.createMany({
    data: [
      {
        profileId,
        company: "Infosys",
        title: "Software Engineer Intern",
        location: "Noida, India",
        startDate: new Date("2021-01-10"),
        endDate: new Date("2021-06-30"),
        isCurrent: false,
        description:
          "Worked on internal dashboard using React, Node.js, and MySQL.",
      },
      {
        profileId,
        company: "TCS",
        title: "Frontend Developer",
        location: "Gurugram, India",
        startDate: new Date("2022-07-01"),
        endDate: new Date("2024-02-15"),
        isCurrent: false,
        description:
          "Built scalable UI components using Next.js, TypeScript, and Tailwind CSS.",
      },
      {
        profileId,
        company: "Freelance",
        title: "Full Stack Developer",
        location: "Remote",
        startDate: new Date("2024-03-01"),
        endDate: null,
        isCurrent: true,
        description:
          "Developing job portal platforms using Next.js, Prisma, PostgreSQL, Clerk/Auth.",
      },
    ],
  });

  console.log("✅ Seeded Education + WorkExperience");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("done");
  });
