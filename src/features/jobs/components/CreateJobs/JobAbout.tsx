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
import clsx from "clsx";

const JobAbout = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<JobFormValues>();
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState<Date>();

  const expiresAt = watch("expiresAt");

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
          <span className="flex flex-row gap-x-2 items-center">
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => {
                const isChecked = value === true;
                setChecked(isChecked);
                setValue("isRemote", isChecked);
              }}
            />
            <p
              className={clsx(
                "text-md",
                checked ? "text-indigo-700" : "text-neutral-500",
              )}
            >
              isRemote
            </p>
          </span>
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
                {expiresAt ? format(expiresAt, "PPP") : "Pick a date"}
                <ArrowDownNarrowWide className="h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  if (date) {
                    setDate(date);
                    setValue("expiresAt", date, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }
                }}
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
            min={1}
            {...register("salaryMin", {
              valueAsNumber: true,
            })}
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
            min={1}
            {...register("salaryMax", {
              valueAsNumber: true,
            })}
          />
          {errors.salaryMax && (
            <FieldError>{errors.salaryMax?.message?.toString()}</FieldError>
          )}
        </Field>

        <Field className="col-span-3">
          <FieldLabel>Description</FieldLabel>
          <textarea
            className="overflow-x-visible h-auto p-2 rounded-md"
            placeholder="add a description for the job at max 500 characters"
            rows={5}
            {...register("description")}
          />
        </Field>
      </FieldGroup>
    </JobFieldCard>
  );
};

export default JobAbout;
