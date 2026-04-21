"use client";

import React from "react";
import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";

export const SpecializationCard = () => {
  return (
    <FieldGroup>
      <Field className="w-full ">
        <FieldLabel className="text-muted-foreground text-xs">
          Tell us what defines you best
        </FieldLabel>
        <Input className="" type="text" placeholder="Web Developer*" required />
      </Field>
      <div className="w-full flex justify-end mb-8">
        <Button>Next</Button>
      </div>
    </FieldGroup>
  );
};
