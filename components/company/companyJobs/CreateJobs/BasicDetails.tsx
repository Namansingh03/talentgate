"use client";

import {
  JobCategoryEnum,
  JobExperienceLevelEnum,
  JobStatusEnum,
  JobTypeEnum,
} from "@/schemas/CompanySchema/JobsSchema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ZodEnumSelect } from "@/components/ui/ZodEnumSelector";
import React from "react";
import { useFormContext } from "react-hook-form";

const BasicDetails = () => {
  const {
    register,
    formState: { errors: formErrors },
    setValue,
    control,
  } = useFormContext();

  return (
    <FieldSet className="w-full border-2 border-indigo-300 rounded-lg p-5 shadow-md">
      <FieldTitle>
        <h1 className="text-2xl font-semibold text-neutral-800">
          Basic Details
        </h1>
      </FieldTitle>
      <FieldDescription className="mt-0 space-y-2">
        provide some basic details about the job
      </FieldDescription>

      <FieldGroup className="w-full flex flex-col">
        <Field>
          <FieldLabel>job title</FieldLabel>
          <Input placeholder="eg. Software engineer" {...register("title")} />
        </Field>
        <Field>
          <FieldLabel>job slug preview</FieldLabel>
          <Input
            placeholder="/talentgate.com/jobs/new-job"
            {...register("slug")}
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="w-full grid grid-cols-2 space-x-5">
        <Field>
          <FieldLabel>Category</FieldLabel>
          <ZodEnumSelect name="category" schema={JobCategoryEnum} />
        </Field>
        <Field>
          <FieldLabel>Job Type</FieldLabel>
          <ZodEnumSelect name="jobType" schema={JobTypeEnum} />
        </Field>
        <Field>
          <FieldLabel>Experience Level</FieldLabel>
          <ZodEnumSelect
            name="JobExperienceLevel"
            schema={JobExperienceLevelEnum}
          />
        </Field>
        <Field>
          <FieldLabel>Status</FieldLabel>
          <ZodEnumSelect name="jobStatus" schema={JobStatusEnum} />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default BasicDetails;
