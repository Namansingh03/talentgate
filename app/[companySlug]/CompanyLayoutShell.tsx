"use client";

import React from "react";
import AdminNavbar from "@/components/company/AdminNavbar";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface CompanyLayoutShellProps {
  role: string;
  slug: string;
  image?: string | null;
  name: string;
  children: React.ReactNode;
}

const CompanyLayoutShell = ({
  children,
  image,
  name,
  role,
  slug,
}: CompanyLayoutShellProps) => {
  console.log(` image : ${image} name : ${name} role : ${role} slug : ${slug}`);

  return (
    <SidebarProvider>
      <CompanySidebar role={role.toLocaleUpperCase()} slug={slug} />

      <div className="flex h-screen w-full flex-col">
        <AdminNavbar image={image} name={name} role={role.toLowerCase()} />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default CompanyLayoutShell;
