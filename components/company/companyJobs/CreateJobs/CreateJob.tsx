"use client";

import React from "react";
import { Company, Job } from "@/app/generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  JobSchema,
  JobCategoryEnum,
  JobExperienceLevelEnum,
  JobFormValues,
  JobStatusEnum,
  JobTypeEnum,
} from "@/schemas/CompanySchema/JobsSchema";

type AdminDetails = {
  username?: string | null;
  email?: string | null;
};

type CompanyDetails = {
  slug: string | null;
  name: string | null;
  location: string | null;
  website: string | null;
  linkedIn: string | null;
};

type CreateJobPageProps = {
  job: Job | null;
  newJob: boolean;
  companyDetails: CompanyDetails | null;
  AdminDetails: AdminDetails | null;
};

const CreateJobPage = ({
  job,
  AdminDetails,
  companyDetails,
  newJob = true,
}: CreateJobPageProps) => {
  const {} = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      tittle: job ? job.title : "",
      slug: job ? job.slug : "",
      benefits: job ? job.benefits : "",
      category: job ? job.category : "DATA",
      description: job ? job.description : "",
      expiresAt: job ? job.expiresAt : new Date(),
      isRemote: job ? job.isRemote : false,
      JobExperienceLevel: job ? job.level : "JUNIOR",
      jobStatus: job ? job.status : "ACTIVE",
      jobType: job ? job.type : "FULL_TIME",
      location: job ? job.location : "",
      requirements: job ? job.requirements : "",
      responsibilities: job ? job.responsibilities : "",
      salaryCurrency: job ? job.salaryCurrency : "",
      salaryMax: job ? job.salaryMax : null,
      salaryMin: job ? job.salaryMin : null,
      skillsRequired: job ? job.skills : [],
    },
    mode: "onSubmit",
  });

  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      {/* header */}
      <div className="w-full flex flex-col p-5">
        <h1 className="text-4xl font-bold font-sans">
          {newJob ? "Create New Job" : "Update Your Job"}
        </h1>
        <p className="text-md text-neutral-400 ">
          Publish a job posting for your company and start attracting top-tier
          talent.
        </p>
      </div>

      <div className="flex flex-row gap-x-5 items-center">
        {/* right section */}
        <section className="w-3xl flex flex-col items-centre"></section>

        {/* left section  */}
        <section className="w-xl flex-col items-centre"></section>
      </div>
    </div>
  );
};

export default CreateJobPage;
