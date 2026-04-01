"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselCardWrapper } from "../ui/CarouselCardWrapper";
import { SpecializationCard } from "../ui/SpecializationCard";
import { SkillsCard } from "../ui/SkillsCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/helpers/formatDate";
import { UpdateProfileProps } from "@/app/api/candidate/profile";

export function TellUsAboutYourself() {
  const [specialization, setSpecialization] = React.useState<string | null>(
    null,
  );
  const [skills, setSkills] = React.useState<string[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const handleSubmit = async () => {
    startTransition(async () => {
      const res = await UpdateProfileProps({
        headline: specialization,
        skills,
      });

      if (res.redirectUrl && !res.success) {
        toast.error(res.message, { description: formatDate() });
        router.push(res.redirectUrl);
      }

      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
      }

      if (res.success && res.redirectUrl) {
        toast.success(res.message, { description: formatDate() });
        router.push(res.redirectUrl);
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center p-5 gap-1">
      <div className="w-full rounded-t-lg bg-white p-5">
        <h1 className="text-2xl text-center font-semibold">
          Tell us about yourself
        </h1>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="rounded-md">
          <CarouselItem>
            <CarouselCardWrapper>
              <SpecializationCard
                selected={specialization}
                setSelected={setSpecialization}
              />
            </CarouselCardWrapper>
          </CarouselItem>

          <CarouselItem>
            <CarouselCardWrapper>
              <SkillsCard
                selectedSkills={skills}
                setSelectedSkills={setSkills}
              />
            </CarouselCardWrapper>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="w-full bg-white rounded-b-lg grid grid-cols-6 p-5">
        <Button onClick={handleSubmit} className="col-span-2 col-start-3">
          {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
        <Button
          className="col-start-6"
          variant={"outline"}
          onClick={() => router.push("/candidate/profile")}
          disabled={isPending}
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
