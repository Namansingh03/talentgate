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
import { EditorRoot, EditorContent } from "novel";
import { ImageIcon, Loader2Icon } from "lucide-react";
import { createCompany } from "@/app/api/company/company";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";

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
      description: "",
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
    <div className="w-full h-screen flex flex-col gap-y-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section
          id="uploadImages"
          className="flex flex-row items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center w-lg h-40 rounded-md">
            <Label>Company Logo</Label>
            {logoImage ? (
              <Image
                alt="logoImage"
                src={logoImage}
                width={100}
                height={100}
                className="rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border border-dashed flex items-center justify-center bg-muted">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
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
          <div className="w-xl h-40 rounded-md flex flex-col items-center justify-center">
            <Label>Company banner</Label>
            {bannerImage ? (
              <Image
                alt="bannerImage"
                src={bannerImage ?? ""}
                width={1000}
                height={100}
                className=""
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
        </section>
        <div id="values" className="grid grid-cols-2 grid-rows-3">
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
              <DropdownMenuTrigger>
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

        {/* text editor */}
        <EditorRoot>
          <EditorContent
            autofocus
            onUpdate={({ editor }) => {
              setValue("description", editor.getHTML());
            }}
          />
        </EditorRoot>

        <Button type="submit" disabled={isPending} className="self-end-safe">
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "create company"
          )}
        </Button>
      </form>

      <AvatarCropDialog
        open={cropOpen}
        image={cropImage}
        onClose={() => setCropOpen(!cropOpen)}
        onSave={handleCropSave}
      />
    </div>
  );
};

export default CompanyForm;
