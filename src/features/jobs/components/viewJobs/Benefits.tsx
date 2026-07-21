"use client";

import React from "react";
import { Dot } from "lucide-react";

interface benefitProps {
  benefits: string[];
}

const Benefits = ({ benefits }: benefitProps) => {
  return (
    <div className="flex flex-col gap-y-5 border-2 border-indigo-300 rounded-lg shadow-md p-5">
      <h1 className="text-xl font-bold capitalize">Perks & benefits</h1>
      <div className="grid grid-cols-2 text-md font-medium text-neutral-600">
        {benefits.map((benefit, i) => (
          <p key={i} className="flex flex-row items-center">
            <Dot className="text-neutral-500 w-5 h-5" />
            <span>{benefit}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
