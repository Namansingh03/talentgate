"use client";

import React from "react";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavbarSkeleton from "../ui/NavbarSkeleton";

const EmployerNavbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const linkClass = (path: string) =>
    `transition-colors ${
      pathName === path
        ? "text-blue-500 font-semibold underline"
        : "text-muted-foreground hover:text-blue-400"
    }`;

  if (isPending) {
    return <NavbarSkeleton />;
  }

  if (!session || !session.user) {
    router.push("/signin");
    return null;
  }

  const user = session.user;

  return (
    <nav className="w-full h-20 shadow-md flex items-center justify-between">
      <div className="flex flex-row gap-x-10 items-center ">
        <Link href={"/"} className="text-3xl font-sans p-5 font-semibold">
          Talent
          <span className="font-semibold text-blue-500">Gate</span>
        </Link>

        <div className="flex flex-row gap-x-8 items-center text-md">
          <Link href="/employer" className={linkClass(`/employer`)}>
            Dashboard
          </Link>

          <Link
            href="/candidate/myJobs"
            className={linkClass(`/employer/myJobs`)}
          >
            Jobs
          </Link>

          <Link
            href={`/candidate/profile`}
            className={linkClass(`/employer/profile`)}
          >
            Profile
          </Link>
        </div>
      </div>

      <div className="p-5 mx-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-12 h-12 border-2 border-to-black hover:border-4 rounded-full">
              {user.image ? (
                <AvatarImage alt="avatarImage" src={user.image} />
              ) : (
                <div>hello</div>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2">
            <DropdownMenuItem onClick={() => router.push(`/employer/profile`)}>
              profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-400"
              onClick={() => authClient.signOut()}
            >
              logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default EmployerNavbar;
