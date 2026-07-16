"use client";

import React from "react";
import { Job } from "@/prisma/generated/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  JobSchema,
  JobCategoryEnum,
  JobExperienceLevelEnum,
  JobFormValues,
  JobStatusEnum,
  JobTypeEnum,
} from "@/src/features/jobs/schemas/JobsSchema";
import BasicDetails from "./BasicDetails";
import { Button } from "@/src/shared/ui/button";
import clsx from "clsx";
import { useSidebar } from "@/src/shared/ui/sidebar";
import JobAbout from "./JobAbout";
import RequirementsCard from "./RequirementsCard";
import SkillsRequired from "./SkillsRequired";

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
  const methods = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: job ? job.title : "",
      slug: job ? job.slug : "",
      category: job ? job.category : "DATA",
      jobStatus: job ? job.status : "ACTIVE",
      jobType: job ? job.type : "FULL_TIME",
      JobExperienceLevel: job ? job.level : "JUNIOR",

      location: job ? job.location : "",
      isRemote: job ? job.isRemote : false,
      expiresAt: job ? job.expiresAt : null,
      salaryCurrency: job ? job.salaryCurrency : "",
      salaryMin: job ? job.salaryMin : null,
      salaryMax: job ? job.salaryMax : null,
      description: job ? job.description : "",

      benefits: job ? job.benefits : [],
      requirements: job ? job.requirements : [],
      responsibilities: job ? job.responsibilities : [],

      skillsRequired: job ? job.skills : [],
    },
    mode: "onSubmit",
  });
  const { state } = useSidebar();

  const onSubmit = (data: JobFormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full p-8 flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2 font-sans">
        <h1 className="capitalize text-3xl font-semibold text-neutral-800">
          Create new job{" "}
        </h1>
        <p className="text-muted-foreground lowercase text-sm">
          Publish a job posting for your company and start attracting top-tier
          talent.
        </p>
      </div>

      {/* left section */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full flex flex-row justify-between gap-x-10"
        >
          <section
            className={clsx(
              "flex flex-col gap-y-5",
              state === "collapsed" ? "w-3xl" : "w-xl",
            )}
          >
            <BasicDetails />
            <JobAbout />
            <RequirementsCard />
            <SkillsRequired />
          </section>

          {/* right section */}
          <section className="w-sm bg-yellow-800 flex flex-col">
            {/* <AuthorDetails /> */}
            <Button type="submit">Publish</Button>
          </section>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateJobPage;
