"use client";

import React, { useState } from "react";
import { ApplicationStatus } from "@/prisma/generated/client";
import { Button } from "@/src/shared";
import ApplicantCard from "./ApplicantCard";

const applicationStatusMap = Object.values(ApplicationStatus);

interface ApplicantCardProps {
  id: string;
  image?: string;
  email?: string;
  name?: string;
  location: string;
  jobTitle: string;
  requestedAt: Date;
  applicationStatus: ApplicationStatus;
}

const ApplicationsRequestsPage = () => {
  const [selectedApplicationStatus, setSelectedApplicationStatus] = useState<
    ApplicationStatus | "All"
  >("All");

  return (
    <div className="w-full p-5 h-screen flex flex-col items-start gap-y-8">
      <div className="w-full flex flex-col">
        <h1 className="text-2xl font-semibold capitalize">
          Recruiters applications
        </h1>
        <p className="text-muted-foreground">
          manage and verify new recruiters applications to maintain marketplace
          quality
        </p>
      </div>

      <div className="w-full rounded-t-lg flex flex-col">
        <div className="w-full bg-neutral-50/70 flex flex-row items-center">
          <div className="bg-neutral-300 p-2">
            {applicationStatusMap.map((status, i) => (
              <Button
                key={i}
                variant={
                  selectedApplicationStatus === status ? "default" : "outline"
                }
                onClick={() => setSelectedApplicationStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full grid grid-cols-8">
          <p className="uppercase text-neutral-700 font-semibold col-span-3">
            Applicants
          </p>
          <p className="uppercase text-neutral-700 font-semibold col-span-1">
            location
          </p>
          <p className="uppercase text-neutral-700 font-semibold col-span-1">
            job title
          </p>
          <p className="uppercase text-neutral-700 font-semibold col-span-1">
            requested at
          </p>
          <p className="uppercase text-neutral-700 font-semibold col-span-1">
            status
          </p>
          <p className="uppercase text-neutral-700 font-semibold col-span-1">
            actions
          </p>
        </div>
      </div>

      {/* {applicants?.map((applicant) => (
        <ApplicantCard
          key={applicant.id}
          id={applicant.id}
          name={applicant.name}
          email={applicant.email}
          image={applicant.image}
          jobTitle={applicant.jobTitle}
          location={applicant.location}
          requestedAt={applicant.requestedAt}
          applicationStatus={applicant.applicationStatus}
        />
      ))} */}
    </div>
  );
};

export default ApplicationsRequestsPage;
