"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/utils/store";
import { authClient } from "@/lib/auth-client";
import UserNavbar from "@/components/Candidate/UserNavbar";

export const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = authClient.useSession();
  const { setUser } = useUserStore();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        loading...
      </div>
    );
  }

  if (!data) {
    return router.push("/signin");
  }

  setUser({
    role: data.user.role,
    username: data.user.username,
    image: data.user.image,
  });

  return (
    <div className="w-full h-screen flex flex-col ">
      <UserNavbar />
      {children}
    </div>
  );
};
