"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import JobFieldCard from "./JobFieldCard";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/src/shared";
import { StringArrayInput } from "@/src/shared/components/StringArrayInput";
import { JobFormValues } from "../../schemas/JobsSchema";

const RequirementsCard = () => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<JobFormValues>();

  const requirements = watch("requirements");
  const responsibilities = watch("responsibilities");
  const benefits = watch("benefits");

  return (
    <JobFieldCard
      title="Requirements and Responsibilities"
      description="Add requirements, benefits and responsibilities for the job"
    >
      <FieldGroup className="flex flex-col gap-y-8">
        <Field>
          <FieldLabel>Requirements</FieldLabel>
          <StringArrayInput
            value={requirements ?? []}
            buttonText="add"
            variant="list"
            placeholder="add requirements for the job"
            onChange={(value) => {
              setValue("requirements", value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          />
          {errors.requirements && <FieldError errors={[errors.requirements]} />}
        </Field>

        <Field>
          <FieldLabel>Responsibilities</FieldLabel>
          <StringArrayInput
            value={responsibilities ?? []}
            buttonText="add"
            variant="list"
            placeholder="add responsibilities for the job"
            onChange={(value) => {
              setValue("responsibilities", value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          />
          {errors.responsibilities && (
            <FieldError errors={[errors.responsibilities]} />
          )}
        </Field>

        <Field>
          <FieldLabel>Benefits</FieldLabel>
          <StringArrayInput
            value={benefits ?? []}
            buttonText="add"
            variant="list"
            placeholder="add benefits for the job"
            onChange={(value) => {
              setValue("benefits", value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          />
          {errors.benefits && <FieldError errors={[errors.benefits]} />}
        </Field>
      </FieldGroup>
    </JobFieldCard>
  );
};

export default RequirementsCard;
