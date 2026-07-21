"use client";

import React from "react";
import { createJobTypeClient, viewJobCompany } from "../../types/JobTypes";
import JobHighlightCard from "./JobHighlightCard";
import AboutRoleCard from "./AboutRoleCard";
import Benefits from "./Benefits";
import CompanyViewCard from "./CompanyViewCard";
import { Button, useSidebar } from "@/src/shared";
import { Bookmark, Share2 } from "lucide-react";
import clsx from "clsx";

interface ViewJobProps {
  job: createJobTypeClient;
  company: viewJobCompany;
}

const ViewJob = ({ job, company }: ViewJobProps) => {
  const { state } = useSidebar();

  return (
    <div className={clsx("flex flex-row gap-x-5 p-5")}>
      {/* left side */}
      <section
        className={clsx(
          "flex flex-col gap-y-5",
          state === "collapsed" ? "min-w-4xl" : "min-w-2xl",
        )}
      >
        <JobHighlightCard
          isRemote={job.isRemote}
          logo={company.logo}
          companyName={company.name}
          level={job.level}
          location={job.location}
          maxSalary={job.salaryMax}
          minSalary={job.salaryMin}
          salaryCurrency={job.salaryCurrency}
          skills={job.skills}
          title={job.title}
          verified={company.isVerified}
          workType={job.type}
        />
        <AboutRoleCard
          description={job.description}
          requirements={job.requirements}
          responsibilities={job.responsibilities}
        />
        <Benefits benefits={job.benefits} />
      </section>

      <section className="flex flex-col gap-y-5">
        <div className="flex flex-col border-2 border-indigo-300 rounded-lg shadow-md p-5 gap-y-5 min-w-xs">
          <Button className="w-full h-15 text-xl bg-indigo-900 text-white font-font-semibold rounded-lg">
            Apply now
          </Button>
          <div className="w-full flex flex-row justify-between">
            <Button className="rounded-lg p-6 w-35">
              <Bookmark /> save
            </Button>
            <Button className="rounded-lg p-6 w-35">
              <Share2 /> share
            </Button>
          </div>
        </div>
        <CompanyViewCard
          createdAt={company.createdAt}
          email={company.companyEmail}
          name={company.name}
          slug={company.slug}
          banner={company.banner}
          logo={company.logo}
        />
      </section>
    </div>
  );
};

export default ViewJob;
