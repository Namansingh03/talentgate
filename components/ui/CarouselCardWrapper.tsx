import React from "react";
import { Card } from "@/components/ui/card";

export const CarouselCardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Card className="w-full p-4 flex items-center justify-center">
      {children}
    </Card>
  );
};
