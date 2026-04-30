"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Settings2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

const EmployerNavbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(79,70,229,0.08)]">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <div className="flex items-center gap-12">
          <Link
            href={"/"}
            className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-600 to-indigo-800"
          >
            Talent<span className="text-indigo-400">Gate</span>
          </Link>

          <ul className="text-muted-foreground">
            <li className="active:text-blue-400">
              <Link href={"/employer/dashboard"}>Dashboard</Link>
            </li>
            <li className="active:text-blue-400">
              <Link href={"/employer/myJobs"}>myJobs</Link>
            </li>
            <li className="active:text-blue-400">
              <Link href={"/employer/Messages"}>Messages</Link>
            </li>
            <li className="active:text-blue-400">
              <Link href={"/employer/profile"}>Profile</Link>
            </li>
          </ul>
        </div>

        <div>
          <h1>search bar</h1>
          <Button>
            <Settings2Icon />
          </Button>
          <Avatar>
            <AvatarImage>{"user image"}</AvatarImage>
            <AvatarFallback>{"fallback"}</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
};

export default EmployerNavbar;
