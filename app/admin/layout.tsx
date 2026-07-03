"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getCompanySlug } from "@/actions/company/company";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminNavbar from "@/components/company/AdminNavbar";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import UserNavbarSkeleton from "@/components/Skeletons/UserNavbarSkeleton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPending, data: session } = authClient.useSession();
  const [slug, setSlug] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

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

  if (isPending) {
    return <UserNavbarSkeleton />;
  }

  if (!session) {
    return null;
  }

  const { name, image, username, email } = session.user;

  return (
    <SidebarProvider>
      <CompanySidebar
        role="admin"
        email={email}
        username={username}
        slug={slug}
      />

      <div className="flex h-screen w-full flex-col">
        <AdminNavbar image={image} name={name} role="admin" />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
