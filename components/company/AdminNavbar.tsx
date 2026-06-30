"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "../ui/input";
import { BellIcon, User2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface AdminNavbarProps {
  name?: string;
  image?: string | null;
  role?: string | null;
}

const AdminNavbar = ({ image, name, role }: AdminNavbarProps) => {
  const router = useRouter();

  return (
    <nav className="w-full sticky px-10 py-2 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-x-24">
        <Input
          placeholder="search for jobs , applications ..."
          className="w-100 border-bg-slate-800 rounded-lg bg-grey-50"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-x-5">
        <BellIcon className="text-blue-800 hover:text-blue-600" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            {image ? (
              <Image
                src={image}
                alt="avatarImage"
                width={50}
                height={50}
                className="border-2 hover:border-3 border-blue-950 rounded-full p-1"
              />
            ) : (
              <User2Icon />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex flex-row items-center justify-between">
              <h1>{name}</h1>
              <span className="lowercase text-xs text-gray-400">{role}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                authClient.signOut();
                router.replace("signin");
              }}
            >
              logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AdminNavbar;
