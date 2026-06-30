"use client";

import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminNavbar from "@/components/company/AdminNavbar";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { authClient } from "@/lib/auth-client";
import UserNavbarSkeleton from "@/components/Skeletons/UserNavbarSkeleton";
import { getCompanySlug } from "@/actions/company/company";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPending, data: session } = authClient.useSession();
  const [slug, setSlug] = useState<string | null>(null);

  if (!session) {
    throw new Error("session not found");
  }

  useEffect(() => {
    if (!session?.user.username) return;

    const loadSlug = async () => {
      const res = await getCompanySlug(session.user.username);

      if (res.success && res.data) {
        setSlug(res.data);
      }
    };

    loadSlug();
  }, [session]);

  if (isPending && !slug) {
    return <UserNavbarSkeleton />;
  }

  const { name, image, username, email } = session?.user;

  return (
    <SidebarProvider>
      <CompanySidebar
        role={"admin"}
        email={email}
        username={username}
        slug={slug}
      />
      <div className="w-full h-screen flex flex-col ">
        <AdminNavbar image={image} name={name} role={"admin"} />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
