"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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
  const [api, setApi] = React.useState<CarouselApi>();
  const [step, setStep] = React.useState(0);
  const router = useRouter();

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setStep(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await UpdateProfileProps({
        headline: specialization,
        skills,
      });

      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
        if (res.redirectUrl) router.push(res.redirectUrl);
        return;
      }

      toast.success(res.message, { description: formatDate() });
      router.push(res.redirectUrl ?? "/candidate/profile");
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <span className="font-serif text-lg tracking-tight">
              Talentgate
            </span>
          </div>
          <h1 className="text-2xl font-serif font-medium tracking-tight">
            Tell us about yourself
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Help us personalize your experience
          </p>

          {/* Step indicator */}
          <div className="flex gap-1.5 mt-5">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  i === step ? "bg-foreground" : "bg-stone-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="px-8 pb-4">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
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
            <div className="flex justify-between mt-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-stone-100">
          <Button
            variant="ghost"
            onClick={() => router.push("/candidate/profile")}
            disabled={isPending}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="min-w-28"
          >
            {isPending ? <Loader2 className="animate-spin size-4" /> : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
