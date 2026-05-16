"use client";

import React, { useState, useTransition } from "react";
import {
  companySchema,
  CompanyFormValues,
  CompanySizeEnum,
} from "@/schemas/companySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Image from "next/image";
import AvatarCropDialog from "../ui/ImageCropDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ImageIcon,
  Loader2Icon,
  Building2,
  Mail,
  Globe,
  Tag,
  Briefcase,
  MapPin,
  Users,
  ChevronDown,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { createCompany } from "@/app/api/company/company";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import TiptapEditor from "../ui/TipTap";

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none z-10" />
        )}
        <div className={Icon ? "[&_input]:pl-9" : ""}>{children}</div>
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

/* ─── Section heading ─────────────────────────────────────────────────── */
function SectionHeading({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="flex-none w-7 h-7 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {step}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-neutral-800">{title}</h2>
        <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */
const CompanyForm = () => {
  const [logoImage, setLogoImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");
  const [cropOpen, setCropOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("SMALL");
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
      industry: "",
      linkedin: "",
      location: "",
      name: "",
      size: "SMALL",
      slug: "",
      website: "",
      companyEmail: "",
      description: undefined,
      logo: undefined,
      banner: undefined,
    },
    mode: "onSubmit",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setCropImage(preview);
    setLogoImage(preview);
    setCropOpen(true);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("banner", file, {
      shouldValidate: true,
    });
    setBannerImage(URL.createObjectURL(file));
  };

  const handleCropSave = (file: File) => {
    setValue("logo", file, { shouldValidate: true });
    setLogoImage(URL.createObjectURL(file));
  };

  const onSubmit = (data: CompanyFormValues) => {
    startTransition(async () => {
      const res = await createCompany(data);
      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
        if (res.redirectUrl) router.push(res.redirectUrl);
        return;
      }
      toast.success(res.message, { description: formatDate() });
      router.push(`/company/${data.slug}/`);
    });
  };

  const sizeLabels: Record<string, string> = {
    SMALL: "Small  ·  1–50 employees",
    MEDIUM: "Medium  ·  51–500 employees",
    LARGE: "Large  ·  500+ employees",
  };

  return (
    <div className="w-5xl max-w-6xl p-8 rounded-lg bg-white  ">
      {/* Page title */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">
          HireLoop
        </p>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
          Create your company
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Fill in your details to start attracting top talent.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* ── 1. Branding ─────────────────────────────────────────── */}
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
                      onChange={handleFileChange}
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
                  onChange={handleBannerChange}
                />
              </label>
              {errors.banner && (
                <p className="text-xs text-red-500">{errors.banner.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── 2. Basic Info ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7">
          <SectionHeading
            step="2"
            title="Basic information"
            subtitle="Core details that appear on your public profile."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Company name"
              icon={Building2}
              error={errors.name?.message}
            >
              <Input
                type="text"
                placeholder="talentgate Corp"
                {...register("name")}
              />
            </Field>

            <Field
              label="Company email"
              icon={Mail}
              error={errors.companyEmail?.message}
            >
              <Input
                type="email"
                placeholder="hello@talentgate.com"
                {...register("companyEmail")}
              />
            </Field>

            <Field
              label="Website URL"
              icon={Globe}
              error={errors.website?.message}
            >
              <Input
                placeholder="https://talentgate.com"
                {...register("website")}
              />
            </Field>

            <Field
              label="LinkedIn URL"
              icon={FaLinkedin}
              error={errors.linkedin?.message}
            >
              <Input
                placeholder="https://linkedin.com/company/talentgate"
                {...register("linkedin")}
              />
            </Field>

            <Field label="Slug" icon={Tag} error={errors.slug?.message}>
              <Input
                type="text"
                placeholder="talentgate-corp"
                {...register("slug")}
              />
            </Field>

            <Field
              label="Industry"
              icon={Briefcase}
              error={errors.industry?.message}
            >
              <Input
                type="text"
                placeholder="e.g. Fintech, Healthcare"
                {...register("industry")}
              />
            </Field>

            <Field
              label="Location"
              icon={MapPin}
              error={errors.location?.message}
            >
              <Input
                type="text"
                placeholder="San Francisco, CA"
                {...register("location")}
              />
            </Field>

            <Field
              label="Company size"
              icon={Users}
              error={errors.size?.message}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-neutral-600 border-neutral-200 h-10 hover:bg-neutral-50"
                  >
                    {sizeLabels[selectedSize] ?? "Select size"}
                    <ChevronDown className="w-4 h-4 text-neutral-400 ml-2 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-55s">
                  {CompanySizeEnum.options.map((val) => (
                    <DropdownMenuItem
                      key={val}
                      onClick={() => {
                        setValue("size", val);
                        setSelectedSize(val);
                      }}
                      className="text-sm"
                    >
                      {sizeLabels[val] ?? val}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Field>
          </div>
        </div>

        {/* ── 3. Description ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7">
          <SectionHeading
            step="3"
            title="Company description"
            subtitle="Tell candidates what makes your company a great place to work."
          />
          <TiptapEditor
            onChange={(html) =>
              setValue("description", html, {
                shouldValidate: true,
              })
            }
          />
        </div>

        {/* ── Submit ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3 pb-10">
          <Button
            type="button"
            variant="ghost"
            className="text-neutral-500 hover:text-neutral-700"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-neutral-900 hover:bg-neutral-800 active:scale-95 transition-transform text-white px-6 h-10 rounded-xl font-medium text-sm"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2Icon className="w-4 h-4 animate-spin" />
                Creating…
              </span>
            ) : (
              "Create company →"
            )}
          </Button>
        </div>
      </form>
      <AvatarCropDialog
        open={cropOpen}
        image={cropImage}
        onClose={() => setCropOpen(false)}
        onSave={handleCropSave}
      />
    </div>
  );
};

export default CompanyForm;
