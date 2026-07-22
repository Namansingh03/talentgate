"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  companySchema,
  CompanyFormValues,
} from "@/src/features/company/schemas/companySchema";
import { createCompany } from "@/src/features/company/actions/createActions";
import { formatDate } from "@/src/shared/utils/formatDate";
import { ImageCropDialog } from "@/src/shared/components/ImageCropDialog";
import { BrandingSection } from "./BrandingSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { DescriptionSection } from "./DescriptionSection";
import { FormActions } from "./FormActions";
import { useCompanyImages } from "@/src/features/company/hooks/useCompanyImages";
import { CompanyFormType } from "../../types/clientTypes/companyPrismaTypes";

interface CompanyFormProps {
  companyDetails?: CompanyFormType | null;
  type: "create" | "update";
}

const CompanyForm = ({ companyDetails, type = "create" }: CompanyFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      industry: companyDetails?.industry ?? "",
      linkedin: companyDetails?.linkedin ?? "",
      location: companyDetails?.location ?? "",
      name: companyDetails?.name ?? "",
      size: companyDetails?.size ?? "SMALL",
      slug: companyDetails?.slug ?? "",
      website: companyDetails?.website ?? "",
      companyEmail: companyDetails?.companyEmail ?? "",
      description: companyDetails?.description ?? {},
      logo: companyDetails?.logo ?? undefined,
      banner: companyDetails?.banner ?? undefined,
    },
    mode: "onSubmit",
  });

  const {
    logoImage,
    bannerImage,
    cropImage,
    cropOpen,
    setCropOpen,
    handleFileChange,
    handleBannerChange,
    handleCropSave,
  } = useCompanyImages(setValue);

  const onSubmit = (data: CompanyFormValues) => {
    startTransition(async () => {
      const res = await createCompany(data);
      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
        if (res.redirectUrl) router.push(res.redirectUrl);
        return;
      }
      toast.success(res.message, { description: formatDate() });
      router.push(`/${data.slug}/admin`);
    });
  };

  return (
    <div className="w-5xl max-w-6xl p-8 rounded-lg bg-white  ">
      {/* Page title */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">
          TalentGate
        </p>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
          Create your company
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Fill in your details to start attracting top talent.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <BrandingSection
          register={register}
          errors={errors}
          logoImage={logoImage ?? companyDetails?.logo}
          bannerImage={bannerImage ?? companyDetails?.banner}
          onLogoChange={handleFileChange}
          onBannerChange={handleBannerChange}
        />

        <BasicInfoSection
          register={register}
          errors={errors}
          setValue={setValue}
        />

        <DescriptionSection
          setValue={setValue}
          content={companyDetails?.description}
        />

        <FormActions isPending={isPending} onCancel={() => router.back()} />
      </form>

      <ImageCropDialog
        open={cropOpen}
        onOpenChange={setCropOpen}
        imageSrc={cropImage ?? ""}
        onCropComplete={handleCropSave}
        title="Crop your avatar"
        outputType="image/jpeg"
        quality={0.92}
      />
    </div>
  );
};

export default CompanyForm;
