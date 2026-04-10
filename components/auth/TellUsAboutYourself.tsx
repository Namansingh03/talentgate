"use client";

import { SkillsOptionCard } from "../Candidate/SkillsOptionCard";
import { SpecializationCard } from "../Candidate/SpecializationCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { SKILLS } from "@/utils/values";

export function TellUsAboutYourself() {
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
        </div>
        <Carousel className="px-8">
          <CarouselContent className="">
            <CarouselItem>
              <SpecializationCard />
            </CarouselItem>
            <CarouselItem>
              <SkillsOptionCard skills={SKILLS} />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
