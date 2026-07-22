"use client";

import React from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CompanyFormValues } from "@/src/features/company/schemas/companySchema";
import { SectionHeading } from "./SectionHeading";

interface BrandingSectionProps {
  register: UseFormRegister<CompanyFormValues>;
  errors: FieldErrors<CompanyFormValues>;
  logoImage: string;
  bannerImage: string;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BrandingSection({
  register,
  errors,
  logoImage,
  bannerImage,
  onLogoChange,
  onBannerChange,
}: BrandingSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7">
      <SectionHeading
        step="1"
        title="Branding"
        subtitle="Upload your logo and a cover banner."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Logo */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Company logo
          </label>
          <div className="flex items-center gap-4">
            {logoImage ? (
              <Image
                alt="Company logo"
                src={logoImage}
                width={72}
                height={72}
                className="w-18 h-18 rounded-xl object-cover ring-2 ring-neutral-200 shrink-0"
              />
            ) : (
              <div className="w-18 h-18 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0">
                <ImageIcon className="w-6 h-6 text-neutral-300" />
              </div>
            )}
            <div>
              <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors px-3 py-1.5 rounded-lg border border-neutral-200">
                <ImageIcon className="w-3 h-3" />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("logo")}
                  onChange={onLogoChange}
                />
              </label>
              <p className="text-[11px] text-neutral-400 mt-1.5 leading-tight">
                PNG or JPG · square preferred
              </p>
              {errors.logo && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.logo.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Cover banner
          </label>
          {bannerImage ? (
            <Image
              alt="Company banner"
              src={bannerImage}
              width={400}
              height={90}
              className="w-full h-22.5 object-cover rounded-xl ring-2 ring-neutral-200"
            />
          ) : (
            <div className="w-full h-22.5 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center gap-1">
              <ImageIcon className="w-5 h-5 text-neutral-300" />
              <p className="text-[11px] text-neutral-400">
                1200 × 400 recommended
              </p>
            </div>
          )}
          <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors px-3 py-1.5 rounded-lg border border-neutral-200 w-fit">
            <ImageIcon className="w-3 h-3" />
            Upload banner
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("banner")}
              onChange={onBannerChange}
            />
          </label>
          {errors.banner && (
            <p className="text-xs text-red-500">{errors.banner.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrandingSection;
