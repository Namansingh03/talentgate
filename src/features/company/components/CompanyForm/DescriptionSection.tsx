"use client";

import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { CompanyFormValues } from "@/src/features/company/schemas/companySchema";
import TiptapEditor from "@/src/shared/ui/TipTap";
import { SectionHeading } from "./SectionHeading";
import { JsonValue } from "@prisma/client/runtime/client";

interface DescriptionSectionProps {
  setValue: UseFormSetValue<CompanyFormValues>;
  content?: JsonValue;
}

export function DescriptionSection({
  setValue,
  content,
}: DescriptionSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7">
      <SectionHeading
        step="3"
        title="Company description"
        subtitle="Tell candidates what makes your company a great place to work."
      />
      <TiptapEditor
        onChange={(html) =>
          setValue("description", [html], {
            shouldValidate: true,
          })
        }
        content={content?.toString()}
      />
    </div>
  );
}

export default DescriptionSection;
