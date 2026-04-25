"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import z from "zod";
import {
  TellUsMoreSchema,
  TellUsMoreSchemaInput,
} from "@/schemas/CandidateSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SKILLS, SPECIALIZATIONS } from "@/utils/values";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UpdateProfile } from "@/app/api/candidate/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers/formatDate";

const STEPS = [
  { label: "Specialization", index: 0 },
  { label: "Skills", index: 1 },
  { label: "About", index: 2 },
  { label: "Bio", index: 3 },
];

interface TellUsMore {
  userId: string;
}

const TellUsAboutYourself = ({ userId }: TellUsMore) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TellUsMoreSchemaInput>({
    resolver: zodResolver(TellUsMoreSchema),
    defaultValues: {
      headline: "",
      skills: [],
      bio: "",
      about: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const skills = watch("skills");
  const specialization = watch("headline");

  const next = async (fields: (keyof TellUsMoreSchemaInput)[]) => {
    const valid = await trigger(fields);
    if (valid) {
      api?.scrollNext();
      setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const prev = () => {
    api?.scrollPrev();
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setValue(
        "skills",
        skills.filter((s: string) => s !== skill),
        { shouldValidate: true },
      );
    } else {
      setValue("skills", [...skills, skill], { shouldValidate: true });
    }
  };

  const onSubmit = (data: z.infer<typeof TellUsMoreSchema>) => {
    console.log(data);
    startTransition(async () => {
      const res = await UpdateProfile({
        candidateProfile: {
          bio: data.bio,
          headline: data.headline,
          skills: data.skills,
          about: data.about,
        },
      });

      if (!res.success) {
        toast.error(res.message, { description: formatDate() });
        return;
      }

      toast.success(res.message, { description: formatDate() });
      router.push(`/candidate/${userId}/profile`);
    });
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-zinc-100">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 font-serif">
            TalentGate
          </h1>
          <span className="text-xs text-zinc-400 font-medium">
            Step {currentStep + 1} of {STEPS.length}
          </span>
        </div>
        <p className="text-sm text-zinc-500 mb-5">
          Tell us about yourself to personalize your experience.
        </p>

        {/* Step progress dots */}
        <div className="flex items-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.index} className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i < currentStep
                    ? "bg-zinc-800 scale-100"
                    : i === currentStep
                      ? "bg-zinc-800 scale-125"
                      : "bg-zinc-200"
                }`}
              />
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-8 transition-all duration-500 ${
                    i < currentStep ? "bg-zinc-800" : "bg-zinc-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {/* STEP 1: Specialization */}
            <CarouselItem className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium text-zinc-700">
                  What&apos;s your specialization?
                </label>
                <p className="text-xs text-zinc-400">
                  e.g. Frontend Engineer, Product Designer, Data Analyst
                </p>
              </div>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    role="combobox"
                    aria-controls=""
                    aria-expanded={open}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md border text-sm transition-colors bg-zinc-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300",
                      specialization
                        ? "text-zinc-900 border-zinc-300"
                        : "text-zinc-400 border-zinc-200",
                    )}
                  >
                    {specialization || "Select a specialization..."}
                    <ChevronsUpDown className="h-4 w-4 text-zinc-400 shrink-0" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search specializations..." />
                    <CommandList>
                      <CommandEmpty>No specialization found.</CommandEmpty>
                      <CommandGroup>
                        {SPECIALIZATIONS.map((spec) => (
                          <CommandItem
                            key={spec}
                            value={spec}
                            onSelect={(val) => {
                              setValue(
                                "headline",
                                val === specialization ? "" : val,
                                { shouldValidate: true },
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                specialization === spec
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {spec}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {errors.headline && (
                <p className="text-red-500 text-xs">
                  {errors.headline.message}
                </p>
              )}

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  onClick={() => next(["headline"])}
                  className="px-6"
                >
                  Continue →
                </Button>
              </div>
            </CarouselItem>

            {/* STEP 2: Skills */}
            <CarouselItem className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium text-zinc-700">
                  Pick your top skills
                </label>
                <p className="text-xs text-zinc-400">
                  Select all that apply — you can always update these later.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                {SKILLS.map((skill) => {
                  const isSelected = skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                        isSelected
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:bg-white"
                      }`}
                    >
                      {isSelected && <span className="mr-1">✓</span>}
                      {skill}
                    </button>
                  );
                })}
              </div>

              {skills.length > 0 && (
                <p className="text-xs text-zinc-400">
                  {skills.length} selected
                </p>
              )}

              {errors.skills && (
                <p className="text-red-500 text-xs">{errors.skills.message}</p>
              )}

              <div className="flex justify-between pt-2">
                <Button type="button" variant="ghost" onClick={prev}>
                  ← Back
                </Button>
                <Button
                  type="button"
                  onClick={() => next(["skills"])}
                  className="px-6"
                >
                  Continue →
                </Button>
              </div>
            </CarouselItem>

            {/* STEP 3: About */}
            <CarouselItem className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium text-zinc-700">
                  About{" "}
                  <span className="text-zinc-400 font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-zinc-400">
                  Share a bit about your background, interests, or goals.
                </p>
              </div>

              <Textarea
                rows={4}
                placeholder="I'm a developer with 3 years of experience in..."
                className="bg-zinc-50 border-zinc-200 focus:bg-white resize-none transition-colors text-sm"
                {...register("about")}
              />

              {errors.about && (
                <p className="text-red-500 text-xs">{errors.about.message}</p>
              )}

              <div className="flex justify-between pt-2">
                <Button type="button" variant="ghost" onClick={prev}>
                  ← Back
                </Button>
                <Button
                  type="button"
                  onClick={() => next(["about"])}
                  className="px-6"
                >
                  Continue →
                </Button>
              </div>
            </CarouselItem>

            {/* STEP 4: Bio */}
            <CarouselItem className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium text-zinc-700">
                  Your short bio
                </label>
                <p className="text-xs text-zinc-400">
                  A one-liner that captures who you are professionally.
                </p>
              </div>

              <Textarea
                rows={3}
                placeholder="Full-stack engineer who loves building products people care about."
                className="bg-zinc-50 border-zinc-200 focus:bg-white resize-none transition-colors text-sm"
                {...register("bio")}
              />

              {errors.bio && (
                <p className="text-red-500 text-xs">{errors.bio.message}</p>
              )}

              <div className="flex justify-between pt-2">
                <Button type="button" variant="ghost" onClick={prev}>
                  ← Back
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="px-6 bg-zinc-900 hover:bg-zinc-700"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Finish setup"
                  )}
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </form>
    </div>
  );
};

export default TellUsAboutYourself;
