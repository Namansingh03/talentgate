"use client";

import UserNavbar from "@/src/shared/components/UserNavbar";
import UserNavbarSkeleton from "@/src/shared/components/UserNavbarSkeleton";
import { Suspense } from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <Suspense fallback={<UserNavbarSkeleton />}>
        <UserNavbar />
      </Suspense>
      {children}
    </div>
  );
};

export default UserLayout;
