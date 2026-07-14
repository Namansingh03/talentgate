"use client";

import { Checkbox } from "@/src/shared/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/src/shared/ui/field";
import { Input } from "@/src/shared/ui/input";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar } from "@/src/shared/ui/calendar";
import { Button } from "@/src/shared/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/ui/popover";
import { ArrowDownNarrowWide } from "lucide-react";
import { format } from "date-fns";
import { JobFormValues } from "@/src/features/jobs/schemas/JobsSchema";
import JobFieldCard from "./JobFieldCard";

const JobAbout = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<JobFormValues>();
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <JobFieldCard
      description="provide more details about the job"
      title="Job Details"
    >
      <FieldGroup className="w-full grid grid-cols-3 space-x-2">
        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input
            placeholder="city, country"
            type="text"
            {...register("location")}
          />
          {errors.location && (
            <FieldError>{errors.location?.message?.toString()}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Remote</FieldLabel>
          <Checkbox
            checked={checked}
            onCheckedChange={() => {
              setValue("isRemote", checked);
              setChecked(!checked);
            }}
          />
          {errors.isRemote && (
            <FieldError>{errors.isRemote?.message?.toString()}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Expires At</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date ? format(date, "PPP") : "Pick a date"}
                <ArrowDownNarrowWide className="h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
          {errors.location && (
            <FieldError>{errors.location?.message?.toString()}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Salary Currency</FieldLabel>
          <Input
            placeholder="dollars"
            type="text"
            {...register("salaryCurrency")}
          />
          {errors.salaryCurrency && (
            <FieldError>
              {errors.salaryCurrency?.message?.toString()}
            </FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Min Salary</FieldLabel>
          <Input
            placeholder="1,00,000"
            type="number"
            {...register("salaryMin")}
          />
          {errors.salaryMin && (
            <FieldError>{errors.salaryMin?.message?.toString()}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Max Salary</FieldLabel>
          <Input
            placeholder="1,60,000"
            type="number"
            {...register("salaryMax")}
          />
          {errors.salaryMax && (
            <FieldError>{errors.salaryMax?.message?.toString()}</FieldError>
          )}
        </Field>

        <Field className="col-span-3">
          <FieldLabel>Description</FieldLabel>
          <textarea
            placeholder="add a description for the job"
            cols={5}
            {...register("description")}
          />
        </Field>
      </FieldGroup>
    </JobFieldCard>
  );
};

export default JobAbout;
