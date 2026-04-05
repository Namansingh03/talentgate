"use client";

import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { BiLogoGmail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SkillsCard from "./SkillsCard";

export default function ProfileSidebar() {
  return (
    <section className="space-y-6 h-max-20 sticky w-md border bg-white/95 border-slate-200 rounded-lg px-8 py-8">
      <div id="personal info">
        <h1 className="text-muted-foreground">Personal information</h1>
        <p className="mt-2 text-sm">
          Building scalable distributed systems and delightful user experiences.
          8+ years of engineering across fintech and cloud infrastructure.
        </p>
      </div>
      <Separator />
      <div id="contact-links" className="flex flex-col gap-y-3 text-sm">
        <Link href={"/"} className="flex flex-row items-center gap-x-5">
          <span>
            <BiLogoGmail className="h-5 w-5" />
          </span>
          email
        </Link>
        <Link href={"/"} className="flex flex-row items-center gap-x-5">
          <span>
            <FaUser className="h-5 w-5" />
          </span>
          portfolio
        </Link>
      </div>
      <Separator />
      <div id="socials">socials links</div>
      <Separator />
      <SkillsCard />
    </section>
  );
}
