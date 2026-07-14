"use client";

import React from "react";
import {
  Field,
  FieldSet,
  FieldTitle,
  FieldDescription,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/src/shared/ui/field";

const JobOptions = () => {
  return (
    <FieldSet>
      <FieldTitle>Skills</FieldTitle>
      <FieldDescription>
        add skills and benefits to the job description
      </FieldDescription>

      <FieldGroup></FieldGroup>
    </FieldSet>
  );
};

export default JobOptions;
