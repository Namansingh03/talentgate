"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  educationSchema,
  EducationSchemaType,
} from "@/schemas/CandidateSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { UpdateProfile } from "@/app/api/candidate/profile";

interface EducationEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  school?: string;
  degree?: string;
  field?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  isCurrent?: boolean;
  description?: string;
  marksObtained?: number;
}

const EducationEditDialog = ({
  degree,
  field,
  isCurrent,
  onOpenChange,
  open,
  school,
  startDate,
  description,
  endDate,
  marksObtained,
}: EducationEditDialogProps) => {
  const [checked, setChecked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: degree,
      description: description,
      startDate: startDate,
      endDate: endDate,
      field: field,
      isCurrent: isCurrent,
      school: school,
      marksObtained: marksObtained,
    },
  });

  async function onSubmit(values: EducationSchemaType) {
    console.log(values);

    onOpenChange(!open);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Education</DialogTitle>
          <DialogDescription>add your education</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldSet>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>School</FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="Harvard University"
                      {...register("school")}
                    />
                    <FieldError>{errors.school?.message}</FieldError>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>currently </FieldLabel>
                  <FieldContent>
                    <Checkbox
                      {...register("isCurrent")}
                      checked={checked}
                      onClick={() => setChecked(!checked)}
                    />
                    <FieldLabel className="m-0 font-normal">
                      I am currently studying here
                    </FieldLabel>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Degree</FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="Bachelor of Science"
                      {...register("degree")}
                    />
                    <FieldError>{errors.degree?.message}</FieldError>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Field of Study</FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="Computer Science"
                      {...register("field")}
                    />
                    <FieldError>{errors.field?.message}</FieldError>
                  </FieldContent>
                </Field>
              </div>

              <div
                className={`grid gap-4 ${checked} ? grid-col-4 : grid-col-2`}
              >
                <Field>
                  <FieldLabel>Start Date</FieldLabel>
                  <FieldContent>
                    <Input type="date" {...register("startDate")} />
                    <FieldError>{errors.startDate?.message}</FieldError>
                  </FieldContent>
                </Field>

                {!checked && (
                  <Field>
                    <FieldLabel>End Date</FieldLabel>
                    <FieldContent>
                      <Input type="date" {...register("endDate")} />
                      <FieldError>{errors.endDate?.message}</FieldError>
                    </FieldContent>
                  </Field>
                )}
              </div>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <FieldContent>
                  <Textarea
                    rows={4}
                    placeholder="Achievements, coursework, activities..."
                    {...register("description")}
                  />
                  <FieldDescription>
                    Optional details about your studies.
                  </FieldDescription>
                  <FieldError>{errors.description?.message}</FieldError>
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(!open)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2Icon className="animate-spin" /> : "save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EducationEditDialog;
