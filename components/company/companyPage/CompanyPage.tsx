"use client";

import Link from "next/link";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWork } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { CompanyType } from "@/types/CompanyTypes";
import { CiGlobe, CiShare2 } from "react-icons/ci";
import { FaShapes, FaUsers, FaRegIdBadge } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

const sizeLabels: Record<string, string> = {
  STARTUP: "10-20 employees",
  SMALL: "21-50 employees",
  MEDIUM: "51-500 employees",
  LARGE: "500-1000 employees",
  ENTERPRISE: "1K+ employees",
};

const CompanyPage = ({ data }: { data: CompanyType }) => {
  const {
    banner,
    createdAt,
    description,
    industry,
    isVerified,
    linkedin,
    location,
    logo,
    members,
    name,
    size,
    jobs,
    slug,
    website,
  } = data;

  const output = Array.isArray(description)
    ? String(description[0] ?? "")
    : typeof description === "string"
      ? description
      : "";

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-8xl mx-auto p-10">
        <section className="mb-12 relative">
          <div className="h-48 w-full rounded-lg  overflow-hidden relative">
            <Image
              alt="TechFlow Office Interior"
              width={1200}
              height={1200}
              className="w-full h-full object-cover"
              src={banner ?? ""}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent"></div>
          </div>
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 px-8 relative z-10">
            <div className="w-32 h-32 rounded-full bg-white p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-primary-gradient flex items-center justify-center text-white overflow-hidden">
                <Image
                  alt="TechFlow Logo"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                  src={logo ?? ""}
                />
              </div>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold tracking-tight text-on-surface">
                  {name ?? "name"}
                </h1>
                <span className="text-md font-semibold text-blue-500">
                  {isVerified ? <FiCheckCircle /> : "not verified yet"}
                </span>
              </div>
              <ul className="flex items-centre justify-start flex-row gap-x-3 text-gray-700 font-medium capitalize">
                <li>{industry ?? "industry"}</li>
                <span>-</span>
                <li>{sizeLabels[size] ?? "size"}</li>
                <span>-</span>
                <li>{location ?? "location"}</li>
              </ul>
            </div>
            <div className="flex gap-3 pb-2">
              <Button className="w-40 h-10 rounded-lg">
                <Link href={website ?? ""}>Visit Website</Link>
              </Button>
              <Button variant={"outline"} className="w-40 h-10 rounded-lg">
                <Link href={linkedin ?? ""}>View LinkedIn</Link>
              </Button>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-surface-container-lowest rounded-lg p-8 shadow-[0px_20px_40px_rgba(77,68,227,0.06)]">
              <h2 className="text-xl font-bold capitalize mb-6 text-on-surface">
                {slug ?? "company slug"}
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-xl font-bold text-on-surface">
                  Open Roles at {slug ?? "company slug"}
                </h2>
                <span className="text-sm font-medium text-primary">
                  {jobs.length} positions available
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
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
                      <span>{size ?? "company size"}</span>
                      <span>,</span>
                      <span>{sizeLabels[size]}</span>
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
                      {createdAt.toString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-lg p-8 shadow-[0px_20px_40px_rgba(77,68,227,0.06)]">
              <h2 className="text-lg font-bold mb-6 text-on-surface">
                Company Stats
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">
                      <MdOutlineWork />
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-on-surface leading-none">
                      number of jobs available
                    </p>
                    <p className="text-md font-medium text-on-surface-variant">
                      {jobs.length}
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-tertiary shadow-sm">
                    <span className="material-symbols-outlined">
                      <FaRegIdBadge />
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-on-surface leading-none">
                      employees
                    </p>
                    <p className="text-md font-medium text-on-surface-variant">
                      {members.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 p-8 rounded-lg text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500"></div>
              <h3 className="text-xl font-bold mb-2">Want to work here?</h3>
              <p className="text-indigo-100 text-sm mb-6">
                Join our newsletter to get notified about new openings at
                TechFlow.
              </p>
              <button className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-on-primary-container transition-all">
                Follow Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
