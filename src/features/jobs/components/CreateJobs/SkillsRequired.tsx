"use client";

import React from "react";
import JobFieldCard from "./JobFieldCard";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/src/shared";
import { StringArrayInput } from "@/src/shared/components/StringArrayInput";
import { useFormContext } from "react-hook-form";
import { JobFormValues } from "../../schemas/JobsSchema";

const SkillsRequired = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<JobFormValues>();

  const skills = watch("skillsRequired");

  return (
    <JobFieldCard
      title="Skills required"
      description="add skills required for the job"
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Skills</FieldLabel>
          <StringArrayInput
            placeholder="add skills for the job"
            variant="badge"
            buttonText="add"
            value={skills ?? []}
            onChange={(value) => {
              setValue("skillsRequired", value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
          {errors.skillsRequired && (
            <FieldError errors={[errors.skillsRequired]} />
          )}
        </Field>
      </FieldGroup>
    </JobFieldCard>
  );
};

export default SkillsRequired;
