"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";

import {
  profileHeaderSchema,
  ProfileHeaderInput,
} from "@/schemas/CandidateSchemas";

interface Props {
  avatarImageUrl?: string;
  bannerImageUrl?: string;
  displayName: string;
  headline: string;
  location: string;
  isAvailable: boolean;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
}

export default function EditProfileHeaderDialog({
  avatarImageUrl,
  bannerImageUrl,
  displayName,
  headline,
  location,
  isAvailable,
  open,
  handleOpenChange,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    avatarImageUrl,
  );
  const [bannerPreview, setBannerPreview] = useState<string | undefined>(
    bannerImageUrl,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileHeaderInput>({
    resolver: zodResolver(profileHeaderSchema),
    defaultValues: {
      displayName,
      headline,
      location,
      isAvailable,
    },
  });

  const onSubmit = (data: ProfileHeaderInput) => {
    startTransition(async () => {
      console.log("validated data:", data);

      // 👉 call server action here

      handleOpenChange(false);
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (type === "avatar") {
      setValue("avatar", file);
      setAvatarPreview(preview);
    } else {
      setValue("banner", file);
      setBannerPreview(preview);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile header</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Banner */}
          <div className="flex flex-col gap-y-3">
            <label className="text-sm font-medium">Banner</label>
            <div className="h-32 bg-gray-100 rounded-md overflow-hidden relative">
              {bannerPreview && (
                <Image
                  src={bannerPreview}
                  alt="banner"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "banner")}
            />
            {errors.banner && (
              <p className="text-red-500 text-xs mt-1">
                {errors.banner.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-row items-center justify-center gap-x-5">
            {/* Avatar */}
            <div className="flex flex-col peer-first:items-center gap-y-2">
              <label className="text-sm font-medium">Avatar</label>
              <div className="w-30 h-30 rounded-full bg-gray-100 overflow-hidden relative">
                {avatarPreview && (
                  <Image
                    src={avatarPreview}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "avatar")}
              />
              {errors.avatar && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.avatar.message as string}
                </p>
              )}
            </div>

            {/* Text fields */}
            <div className="flex flex-col gap-y-4">
              <Input placeholder="Name" {...register("displayName")} />
              {errors.displayName && (
                <p className="text-red-500 text-xs">
                  {errors.displayName.message}
                </p>
              )}

              <Input placeholder="Headline" {...register("headline")} />
              {errors.headline && (
                <p className="text-red-500 text-xs">
                  {errors.headline.message}
                </p>
              )}

              <Input placeholder="Location" {...register("location")} />
              {errors.location && (
                <p className="text-red-500 text-xs">
                  {errors.location.message}
                </p>
              )}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("isAvailable")} />
                Open to work
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2Icon className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
