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
import { Label } from "../ui/label";
import Image from "next/image";
import AvatarCropDialog from "../ui/ImageCropDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ImageIcon, Loader2Icon } from "lucide-react";
import { createCompany } from "@/app/api/company/company";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import TiptapEditor from "../ui/TipTap";

const CompanyForm = () => {
  const [logoImage, setLogoImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");
  const [cropOpen, setCropOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
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

    const preview = URL.createObjectURL(file);
    setBannerImage(preview);
  };

  const handleCropSave = (file: File) => {
    setValue("logo", file, { shouldValidate: true });
    setLogoImage(URL.createObjectURL(file));
  };

  const onSubmit = (data: CompanyFormValues) => {
    console.log(data);
    startTransition(async () => {
      const res = await createCompany(data);

      if (!res.success) {
        if (res.redirectUrl) {
          toast.error(res.message, { description: formatDate() });
          router.push(res.redirectUrl);
        } else {
          toast.error(res.message, { description: formatDate() });
        }
      }

      toast.success(res.message, { description: formatDate() });
      router.push(`/company/${data.slug}/`);
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div
          id="uploadImages"
          className="w-full flex flex-row items-start justify-between"
        >
          <div className="flex flex-col items-start justify-center w-lg h-auto rounded-md gap-y-5">
            <Label className="text-neutral-500 font-semibold font-sans text-lg">
              Company Logo
            </Label>
            {logoImage ? (
              <Image
                alt="logoImage"
                src={logoImage}
                width={100}
                height={100}
                className="rounded-full w-40 h-40"
              />
            ) : (
              <div className="w-40 h-40 rounded-full border border-dashed flex items-center justify-center bg-muted p-5">
                <ImageIcon className="w-40 h-40 text-muted-foreground" />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              {...register("logo")}
              onChange={handleFileChange}
              required
            />
            {errors.logo && (
              <p className="text-red-500 text-xs">{errors.logo.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center w-lg h-auto rounded-md gap-y-5">
            <Label className="text-neutral-500 font-semibold font-sans text-lg">
              Company banner
            </Label>
            {bannerImage ? (
              <Image
                alt="bannerImage"
                src={bannerImage ?? ""}
                width={1000}
                height={100}
                className="w-md contain-content h-40"
              />
            ) : (
              <div className="w-full h-40 border border-dashed rounded-md flex items-center justify-center bg-muted">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              {...register("banner")}
              onChange={(e) => handleBannerChange(e)}
            />
            {errors.banner && (
              <p className="text-red-500 text-xs">{errors.banner.message}</p>
            )}
          </div>
        </div>
        <Separator />
        <div id="values" className="grid grid-cols-2 grid-rows-3 gap-7">
          {/* company name */}
          <div className="flex flex-col gap-y-3">
            <Label>name</Label>
            <Input
              type="text"
              placeholder="enter a company name"
              {...register("name")}
              required
            />
          </div>
          {/* company email */}
          <div className="flex flex-col gap-y-3">
            <Label>email</Label>
            <Input
              type="text"
              placeholder="enter your company email"
              {...register("companyEmail")}
              required
            />
          </div>
          {/* company website */}
          <div className="flex flex-col gap-y-3">
            <Label>website url</Label>
            <Input
              type="text"
              placeholder="enter your company website url"
              {...register("website")}
              required
            />
          </div>
          {/* company linkedin */}
          <div className="flex flex-col gap-y-3">
            <Label>linkedin url</Label>
            <Input
              type="text"
              placeholder="enter your company linkedin url"
              {...register("linkedin")}
              required
            />
          </div>
          {/* company slug */}
          <div className="flex flex-col gap-y-3">
            <Label>slug</Label>
            <Input
              type="text"
              placeholder="/talentgate.com/slug"
              {...register("slug")}
              required
            />
          </div>
          {/* company industry */}
          <div className="flex flex-col gap-y-3">
            <Label>industry</Label>
            <Input
              type="text"
              placeholder="industry name"
              {...register("industry")}
              required
            />
          </div>

          {/* company location */}
          <div className="flex flex-col gap-y-3">
            <Label>location</Label>
            <Input
              type="text"
              placeholder="company located at"
              {...register("location")}
              required
            />
          </div>

          {/* company size */}
          <div className="flex flex-col gap-y-3">
            <Label>size</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>select company size</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {CompanySizeEnum.options.map((val) => (
                  <DropdownMenuItem
                    key={val}
                    onClick={() => setValue("size", val)}
                  >
                    {val}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />

        <div className="w-full h-auto flex flex-col items-start justify-center gap-y-3">
          <Label>Description</Label>
          <TiptapEditor />
        </div>

        <Button type="submit" disabled={isPending} className="self-end-safe">
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "create company"
          )}
        </Button>
        <AvatarCropDialog
          open={cropOpen}
          image={cropImage}
          onClose={() => setCropOpen(!cropOpen)}
          onSave={handleCropSave}
        />
      </form>
    </div>
  );
};

export default CompanyForm;
