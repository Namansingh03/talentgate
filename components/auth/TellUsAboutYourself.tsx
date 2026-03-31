"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function TellUsAboutYourself() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-50 sm:max-w-2xl">
      <Carousel setApi={setApi} className="w-full max-w-2xl">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="m-px">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Bottom Controls */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <p className="text-sm text-muted-foreground">
            Slide {current} of {count}
          </p>
        </div>
      </Carousel>
    </div>
  );
}
