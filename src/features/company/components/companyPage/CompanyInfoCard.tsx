"use client";

import React from "react";
import { sizeLabels } from "./CompanyPageHead";
import { format } from "date-fns";
import { CiGlobe, CiShare2 } from "react-icons/ci";
import { FaShapes, FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

interface CompanyInfoCardProps {
  website: string | null;
  industry: string | null;
  linkedin: string | null;
  companySize: string;
  location: string | null;
  joined: Date;
}

const CompanyInfoCard = ({
  companySize,
  industry,
  joined,
  linkedin,
  location,
  website,
}: CompanyInfoCardProps) => {
  const formattedCreatedAt = format(joined, "dd MMM yyyy : hh/mm/");

  return (
    <div className="bg-surface-container-lowest rounded-lg p-8 shadow-[0px_20px_40px_rgba(77,68,227,0.06)]">
      <h2 className="text-lg font-bold mb-6 text-on-surface">
        Company Information
      </h2>
      <div className="space-y-6">
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400">
            <CiGlobe />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Website
            </p>
            <a
              className="text-sm font-medium text-primary hover:underline"
              href="#"
            >
              {website ?? "company website url"}
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400">
            <CiShare2 />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              LinkedIn
            </p>
            <a
              className="text-sm font-medium text-primary hover:underline"
              href="#"
            >
              {linkedin ?? "company linkedin url"}
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400">
            <FaShapes />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Industry
            </p>
            <p className="text-sm font-medium text-on-surface">
              {industry ?? "industry"}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400">
            <FaUsers />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Company Size
            </p>
            <div className="text-sm flex flex-row items-center justify-center gap-x-3 font-medium text-on-surface">
              <span>{companySize ?? "company size"}</span>
              <span>,</span>
              <span>{sizeLabels[companySize]}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400">
            <FaLocationDot />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Location
            </p>
            <p className="text-sm font-medium text-on-surface">
              {location ?? "city, country"}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400">
            <SlCalender />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Joined
            </p>
            <p className="text-sm font-medium text-on-surface">
              {formattedCreatedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoCard;
