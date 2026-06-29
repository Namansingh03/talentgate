"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminNavbar from "@/components/company/AdminNavbar";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { authClient } from "@/lib/auth-client";
import UserNavbarSkeleton from "@/components/Skeletons/UserNavbarSkeleton";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isPending, data: session } = authClient.useSession();

  if (isPending) {
    return <UserNavbarSkeleton />;
  }

  if (!session) {
    throw new Error("session not found");
  }

  const { name, image } = session?.user;

  return (
    <SidebarProvider>
      <CompanySidebar role={"admin"} />
      <div className="w-full h-screen flex flex-col ">
        <AdminNavbar image={image} name={name} role={"admin"} />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default layout;
