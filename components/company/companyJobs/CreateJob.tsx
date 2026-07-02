"use client";

import React from "react";
import { Job } from "@/app/generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { jobFormValues, JobSchema } from "@/schemas/companySchema";

type CreateJobPageProps = {
  job: Job | null;
};

const CreateJobPage = ({ job }: CreateJobPageProps) => {
  const {} = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      benefits: "",
      category: "DATA",
      description: "",
      expiresAt: new Date(),
      isRemote: false,
      level: "INTERN",
      location: "",
      requirements: "",
      responsibilities: "",
      salaryCurrency: "",
      salaryMax: 0,
      salaryMin: 0,
      skills: [],
      slug: "",
      status: "ACTIVE",
      title: "",
      type: "FREELANCE",
    },
    mode: "onSubmit",
  });

  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      {/* header */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold font-sans">Job</h1>
        <p className="text-md text-neutral-400 ">
          Publish a new job posting for your company and start attracting
          top-tier talent.
        </p>
      </div>

      <div className="flex flex-row gap-x-5 items-center">
        {/* right section */}
        <section className="w-3xl flex flex-col items-centre"></section>
      </div>
    </div>
  );
};

export default CreateJobPage;
