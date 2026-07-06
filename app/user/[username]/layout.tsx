"use client";

import UserNavbar from "@/components/Candidate/UserNavbar";
import UserNavbarSkeleton from "@/components/Skeletons/UserNavbarSkeleton";
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
