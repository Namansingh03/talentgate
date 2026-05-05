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
import { Loader2, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { UpdateUser } from "@/app/api/candidate/profile";
import { formatDate } from "@/helpers/formatDate";

const STEPS = [
  { label: "I am", index: 0 },
  { label: "specialization", index: 1 },
  { label: "location", index: 2 },
  { label: "Bio", index: 3 },
];

type Role = "candidate" | "recruiter" | "admin";

const intentRouting: Record<Role, string> = {
  admin: "/addCompany",
  recruiter: "/addMembership",
  candidate: "/setProfile",
};

const intentVals = ["candidate", "recruiter", "admin"] as const;

interface TellUsMore {
  userId?: string;
}

const TellUsAboutYourself = ({ userId }: TellUsMore) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentStep, setCurrentStep] = useState(0);
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
      intent: "candidate",
      headline: "",
      location: "",
      bio: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const intent = watch("intent");

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

  const onSubmit = (data: z.infer<typeof TellUsMoreSchema>) => {
    startTransition(async () => {
      console.log(data);
      const res = await UpdateUser({
        userId,
        data,
      });

      if (!res.success) {
        if (res.redirectUrl) {
          toast.error(res.message, { description: formatDate() });
          router.push(res.redirectUrl);
        }
        toast.error(res.message, { description: formatDate() });
        return;
      }

      const route = intentRouting[data.intent as Role];
      toast.success(res.message, { description: formatDate() });
      router.push(route);
    });
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden">
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
        <Carousel setApi={setApi} opts={{ watchDrag: false }}>
          <CarouselContent>
            {/* STEP 0: I AM */}
            <CarouselItem>
              {/* ✅ Explicit div wrapper with min-height so carousel measures it correctly */}
              <div className="flex flex-col gap-4 min-h-50 p-1">
                <div className="grid grid-cols-3 space-x-5 space-y-5 last:grid-start-2">
                  {intentVals.map((item, index) => (
                    <Button
                      key={index}
                      type="button"
                      onClick={() => {
                        setValue("intent", item, {
                          shouldValidate: true,
                        });
                      }}
                      variant={intent === item ? "default" : "outline"}
                    >
                      {item}
                    </Button>
                  ))}
                </div>

                {errors.intent && (
                  <p className="text-red-500 text-xs">
                    {errors.intent.message}
                  </p>
                )}

                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={() => next(["intent"])}>
                    Next →
                  </Button>
                </div>
              </div>
            </CarouselItem>

            {/* STEP 1: HEADLINE */}
            <CarouselItem className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium text-zinc-700">
                  What are your specializations? {/* ✅ Bug 4 fix: typo */}
                </label>
                <p className="text-xs text-zinc-400">What defines you best.</p>
              </div>
              <Input
                className="p-5"
                placeholder="Web developer , admin , ceo"
                required
                {...register("headline")}
              />

              {errors.headline && (
                <p className="text-red-500 text-xs">
                  {errors.headline.message}
                </p>
              )}
              <div className="flex flex-row justify-between w-full">
                <Button type="button" onClick={prev}>
                  {" "}
                  {/* ✅ Bug 3 fix */}
                  <MoveLeftIcon />
                  prev
                </Button>
                <Button type="button" onClick={() => next(["headline"])}>
                  {" "}
                  {/* ✅ Bug 3 fix */}
                  next
                  <MoveRightIcon />
                </Button>
              </div>
            </CarouselItem>

            {/* STEP 2: LOCATION */}
            <CarouselItem>
              <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium text-zinc-700">
                  Location
                </label>
                <p className="text-xs text-zinc-400">Your office location.</p>
              </div>
              <Input placeholder="city, country" {...register("location")} />
              {errors.location && (
                <p className="text-red-500 text-xs">
                  {errors.location.message}
                </p>
              )}
              <div className="flex flex-row justify-between w-full mt-4">
                <Button type="button" onClick={prev}>
                  {" "}
                  {/* ✅ Bug 3 fix */}
                  <MoveLeftIcon />
                  prev
                </Button>
                <Button type="button" onClick={() => next(["location"])}>
                  {" "}
                  {/* ✅ Bug 3 fix */}
                  next
                  <MoveRightIcon />
                </Button>
              </div>
            </CarouselItem>

            {/* STEP 3: BIO */}
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
                  {/* ✅ Bug 3 fix */}← Back
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
