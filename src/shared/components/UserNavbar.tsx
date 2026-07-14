"use client";

import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { LogOutIcon, User2Icon, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import UserNavbarSkeleton from "../Skeletons/UserNavbarSkeleton";

const UserNavbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (isPending) {
    return <UserNavbarSkeleton />;
  }

  if (!session) {
    throw new Error("session not found");
  }

  const { username, image, name } = session.user;

  console.log("image : ", image);

  const navItems = [
    {
      label: "Dashboard",
      href: `/user/${username}`,
      exact: true,
    },
    {
      label: "MyJobs",
      href: `/user/${username}/myJobs`,
    },
    {
      label: "Messages",
      href: `/user/${username}/messages`,
    },
    {
      label: "Insights",
      href: `/user/${username}/insights`,
    },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full px-10 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-x-24">
        <h1 className="text-2xl font-bold text-blue-800">Talentgate</h1>

        <ul className="flex gap-x-10 text-md">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-colors duration-200 ${
                  isActive(item.href, item.exact)
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-neutral-500 hover:text-blue-400"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-5">
        <div className="text-sm rounded-xl border bg-white text-slate-500 shadow-md border-slate-500 w-xs px-5 py-1">
          search bar
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {image ? (
              <Image
                src={image}
                alt="avatarImage"
                width={50}
                height={50}
                className="rounded-full border-2 border-blue-600 hover:border-blue-800"
              />
            ) : (
              <div className="border-4 border-blue-600 hover:border-blue-800 rounded-full p-1">
                <User2Icon className="w-8 h-8 rounded-full text-blue-700" />
              </div>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-2">
            <DropdownMenuLabel className="capitalize text-neutral-800">
              {name}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={`/${username}/profile`}
                className="flex items-center gap-x-2 text-md text-neutral-600"
              >
                <UserRound className="w-5 h-5" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.replace("/signin"),
                  },
                })
              }
              className="text-red-700"
            >
              <LogOutIcon className="w-5 h-5" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default UserNavbar;
