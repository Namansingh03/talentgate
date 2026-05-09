"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { User2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { labels: "dashboard", href: "/dashboard" },
  { labels: "myJobs", href: "/myJobs" },
  { labels: "messages", href: "/messages" },
];

const CandidateNavbar = () => {
  const pathname = usePathname();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-md">
      <nav className="flex flex-row justify-between items-center max-w-7xl mx-auto p-5">
        <div className="flex items-center justify-center gap-12">
          <Link
            href={"/"}
            className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-600 to-indigo-800"
          >
            Talent<span className="text-indigo-400">Gate</span>
          </Link>
          <div className="flex flex-row items-center justify-center gap-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-md font-medium transition-colors
              ${isActive ? "text-black underline-offset-6 underline" : "text-gray-500 hover:text-black"}`}
                >
                  {link.labels}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-x-5">
          <Input
            className="w-sm h-8 rounded-lg border-gray-500 border-2 shadow-md"
            type="text"
            placeholder="search..."
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {imageUrl ? (
                <Image
                  alt="avatarImage"
                  src={imageUrl}
                  className="bg-gray-500 border-black border-2 rounded-full"
                  width={80}
                  height={80}
                />
              ) : (
                <User2Icon className="bg-gray-400 border-gray-800 border-2 w-12 h-12 rounded-full p-3 text-white" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/${username}/profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>add company</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => authClient.signOut()}
                className="text-red-500"
              >
                logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default CandidateNavbar;
