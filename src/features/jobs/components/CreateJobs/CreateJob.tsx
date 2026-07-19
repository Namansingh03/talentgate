"use client";

import React, { useTransition } from "react";
import { Job } from "@/prisma/generated/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  JobSchema,
  JobFormValues,
} from "@/src/features/jobs/schemas/JobsSchema";
import BasicDetails from "./BasicDetails";
import { Button } from "@/src/shared/ui/button";
import clsx from "clsx";
import { useSidebar } from "@/src/shared/ui/sidebar";
import JobAbout from "./JobAbout";
import RequirementsCard from "./RequirementsCard";
import SkillsRequired from "./SkillsRequired";
import AdminDetailsCard from "./AdminDetailsCard";
import { RocketIcon } from "lucide-react";
import { createJobAction } from "../../actions/createActions";
import { toast } from "sonner";
import { formatDate } from "@/src/shared";

type AdminDetails = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
};

type CompanyDetails = {
  slug: string | null;
  name: string | null;
  location: string | null;
};

type CreateJobPageProps = {
  job: Job | null;
  newJob: boolean;
  company: CompanyDetails;
  admin: AdminDetails;
};

const CreateJobPage = ({
  job,
  admin,
  company,
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
  const [isPending, startTransition] = useTransition();
  const formattedDate = formatDate();
  const onSubmit = (data: JobFormValues) => {
    startTransition(async () => {
      const res = await createJobAction({
        adminUsername: admin.username,
        companySlug: company.slug,
        jobDetails: {
          benefits: data.benefits,
          category: data.category,
          description: data.description,
          expiresAt: data.expiresAt,
          isRemote: data.isRemote,
          level: data.JobExperienceLevel,
          location: data.location,
          requirements: data.requirements,
          responsibilities: data.responsibilities,
          salaryCurrency: data.salaryCurrency,
          salaryMax: data.salaryMax,
          salaryMin: data.salaryMin,
          skills: data.skillsRequired,
          slug: data.slug,
          status: data.jobStatus,
          title: data.title,
          type: data.jobType,
        },
      });

      if (!res.success) {
        toast.error(res.message, { description: formattedDate });
        return;
      }

      toast.success(res.message, { description: formattedDate });
      methods.reset();
    });
  };

  return (
    <div className="w-full p-8 flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2 font-sans">
        <h1 className="capitalize text-3xl font-semibold text-neutral-800">
          {newJob ? "Create Job" : "Update Job"}
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
          <section className="w-sm flex flex-col gap-y-10 sticky top-0 h-fit self-start">
            {/* <AuthorDetails /> */}
            <AdminDetailsCard admin={admin} company={company} />
            <Button
              disabled={isPending}
              type="submit"
              className="bg-indigo-900 text-xl font-mono p-6 rounded-xl text-white"
            >
              <span>Publish</span> <RocketIcon className="w-14 h-14 ml-2" />
            </Button>
          </section>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateJobPage;
