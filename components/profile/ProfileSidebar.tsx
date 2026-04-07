"use client";

import React, { Suspense } from "react";
import { Separator } from "../ui/separator";
import ContactCardSkeleton from "./skeletons/ContactCardSkeleton";
import ContactCard from "./ContactCard";

export default function ProfileSidebar() {
  return (
    <section className="space-y-6 w-max-sm border bg-white/95 border-slate-200 rounded-lg px-8 py-8 h-fit sticky">
      <div id="personal info">
        <h1 className="text-muted-foreground">Personal information</h1>
        <p className="mt-2 text-sm">
          Building scalable distributed systems and delightful user experiences.
          8+ years of engineering across fintech and cloud infrastructure.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<ContactCardSkeleton />}>
        <ContactCard />
      </Suspense>
    </section>
  );
}
