"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

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

import {
  profileHeaderSchema,
  ProfileHeaderInput,
} from "@/schemas/CandidateSchemas";

import { UpdateProfile } from "@/app/api/candidate/profile";
import { uploadImage } from "@/helpers/UploadImage";
import { formatDate } from "@/helpers/formatDate";

import AvatarCropDialog from "./ImageCropDialog";

interface Props {
  avatarImageUrl?: string;
  bannerImageUrl?: string;
  displayName: string;
  headline: string;
  location: string;
  isAvailable: boolean;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  username?: string | null;
}

export default function EditProfileHeaderDialog({
  avatarImageUrl,
  bannerImageUrl,
  displayName,
  headline,
  location,
  isAvailable,
  open,
  username,
  handleOpenChange,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    avatarImageUrl,
  );

  const [bannerPreview, setBannerPreview] = useState<string | undefined>(
    bannerImageUrl,
  );

  // crop dialog state
  const [cropOpen, setCropOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);

  useEffect(() => {
    if (!username) router.push("/signin");
  }, [username, router]);

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

  // submit form
  const onSubmit = (data: ProfileHeaderInput) => {
    startTransition(async () => {
      let avatarUrl = avatarPreview;
      let bannerUrl = bannerPreview;

      // upload avatar
      if (data.avatar) {
        const res = await uploadImage({
          file: data.avatar,
          imageTypes: "avatarImage",
          username,
        });

        avatarUrl = res.url;
      }

      // upload banner
      if (data.banner) {
        const res = await uploadImage({
          file: data.banner,
          imageTypes: "bannerImage",
          username,
        });

        bannerUrl = res.url;
      }

      // db update
      const res = await UpdateProfile({
        user: {
          image: avatarUrl?.toString(),
          displayUsername: data.displayName,
        },
        candidateProfile: {
          headline: data.headline,
          bannerImage: bannerUrl?.toString(),
          isOpenToWork: data.isAvailable,
          location: data.location,
        },
      });

      if (!res.success) {
        toast.error(res.message, {
          description: formatDate(),
        });

        return res.redirectUrl
          ? router.push(res.redirectUrl)
          : router.refresh();
      }

      toast.success(res.message, {
        description: formatDate(),
      });

      router.refresh();
      handleOpenChange(false);
    });
  };

  // file input
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (type === "avatar") {
      setCropImage(preview);
      setCropOpen(true);
    } else {
      setValue("banner", file);
      setBannerPreview(preview);
    }
  };

  // receive cropped avatar
  const handleCropSave = (file: File) => {
    setValue("avatar", file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <>
      {/* Main Edit Dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="min-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile header</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Banner */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Banner</label>

              <div className="h-32 rounded-md overflow-hidden bg-gray-100 relative">
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
                <p className="text-xs text-red-500">
                  {errors.banner.message as string}
                </p>
              )}
            </div>

            {/* Avatar + Fields */}
            <div className="flex gap-6">
              {/* Avatar */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Avatar</label>

                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 relative">
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
                  <p className="text-xs text-red-500">
                    {errors.avatar.message as string}
                  </p>
                )}
              </div>

              {/* Inputs */}
              <div className="flex-1 space-y-3">
                <Input placeholder="Name" {...register("displayName")} />

                {errors.displayName && (
                  <p className="text-xs text-red-500">
                    {errors.displayName.message}
                  </p>
                )}

                <Input placeholder="Headline" {...register("headline")} />

                {errors.headline && (
                  <p className="text-xs text-red-500">
                    {errors.headline.message}
                  </p>
                )}

                <Input placeholder="Location" {...register("location")} />

                {errors.location && (
                  <p className="text-xs text-red-500">
                    {errors.location.message}
                  </p>
                )}

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("isAvailable")} />
                  Open to work
                </label>
              </div>
            </div>

            {/* Footer */}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => handleOpenChange(false)}
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

      {/* Separate Crop Dialog */}
      <AvatarCropDialog
        open={cropOpen}
        image={cropImage}
        onClose={() => setCropOpen(false)}
        onSave={handleCropSave}
      />
    </>
  );
}
