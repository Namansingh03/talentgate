"use client";

import React from "react";
import AdminNavbar from "@/components/company/AdminNavbar";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

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
  return (
    <SidebarProvider>
      <div className="min-w-full h-screen flex flex-col">
        <AdminNavbar
          image={image}
          name={name}
          role={role.toLowerCase()}
          slug={slug}
        />
        <div className="flex flex-1 overflow-hidden">
          <CompanySidebar slug={slug} image={image} name={name} />
          <SidebarInset>
            <main className="h-full overflow-y-auto p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CompanyLayoutShell;
