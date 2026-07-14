"use client";

import React from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/src/shared/ui/field";
import {
  JobCategoryEnum,
  JobExperienceLevelEnum,
  JobFormValues,
  JobStatusEnum,
  JobTypeEnum,
} from "@/src/features/jobs/schemas/JobsSchema";
import { Input } from "@/src/shared/ui/input";
import { useFormContext } from "react-hook-form";
import { ZodEnumSelect } from "@/src/shared/components/ZodEnumSelector";
import JobFieldCard from "./JobFieldCard";

const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobFormValues>();

  return (
    <JobFieldCard
      description="provide some basic details about the job"
      title="Basic Details"
    >
      <FieldGroup className="w-full flex flex-col">
        <Field>
          <FieldLabel>job title</FieldLabel>
          <Input placeholder="eg. Software engineer" {...register("title")} />
          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel>job slug preview</FieldLabel>
          <Input
            placeholder="/talentgate.com/jobs/new-job"
            {...register("slug")}
          />
          {errors.slug && (
            <FieldError>{errors.slug.message?.toString()}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <FieldGroup className="w-full grid grid-cols-2 space-x-5">
        <Field>
          <FieldLabel>Category</FieldLabel>
          <ZodEnumSelect name="category" schema={JobCategoryEnum} />
          {errors.category && (
            <FieldError>{errors.category.message?.toString()}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Job Type</FieldLabel>
          <ZodEnumSelect name="jobType" schema={JobTypeEnum} />
          {errors.jobType && (
            <FieldError>{errors.jobType.message?.toString()}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Experience Level</FieldLabel>
          <ZodEnumSelect
            name="JobExperienceLevel"
            schema={JobExperienceLevelEnum}
          />
          {errors.JobExperienceLevel && (
            <FieldError>
              {errors.JobExperienceLevel.message?.toString()}
            </FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Status</FieldLabel>
          <ZodEnumSelect name="jobStatus" schema={JobStatusEnum} />
          {errors.jobStatus && (
            <FieldError>{errors.jobStatus.message?.toString()}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </JobFieldCard>
  );
};

export default BasicDetails;
