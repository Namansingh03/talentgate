"use client";

import AdminNavbar from "@/components/company/AdminNavbar";
import React from "react";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import UserNavbarSkeleton from "@/components/Skeletons/UserNavbarSkeleton";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <UserNavbarSkeleton />;
  }

  if (!session) {
    throw new Error("session not found");
  }

  const { username, name, image, role } = session.user;

  return (
    <SidebarProvider>
      <CompanySidebar role={role} />
      <div className="w-full h-screen flex flex-col ">
        <AdminNavbar image={image} name={name} role={role} />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default layout;
