"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import UserNavbarSkeleton from "../Skeletons/UserNavbarSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaGear } from "react-icons/fa6";
import { Input } from "../ui/input";
import { LogOut } from "lucide-react";

const AdminNavbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (isPending) {
    return <UserNavbarSkeleton />;
  }

  if (!session) {
    throw new Error("session not found");
  }

  const { username, name } = session.user;

  const navItems = [
    {
      label: "Dashboard",
      href: `/${username}`,
      exact: true,
    },
    {
      label: "MyJobs",
      href: `/${username}/myJobs`,
    },
    {
      label: "Messages",
      href: `/${username}/messages`,
    },
    {
      label: "Insights",
      href: `/${username}/insights`,
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

      <div className="flex flex-row items-center justify-between gap-x-5">
        <Input
          placeholder="search"
          className="rounded-lg w-xs border-neutral-600 shadow-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaGear className="w-5 h-5 text-neutral-500 hover:text-neutral-900" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>hello</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>hello</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.replace("/signin"),
                  },
                })
              }
            >
              <LogOut />
              logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AdminNavbar;
