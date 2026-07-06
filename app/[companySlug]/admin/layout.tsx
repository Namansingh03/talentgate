"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminNavbar from "@/components/company/AdminNavbar";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { getCompanyDetailByUsername } from "@/actions/company/company";
import UserNavbarSkeleton from "@/components/Skeletons/UserNavbarSkeleton";
import { useAdminStore } from "@/utils/store";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPending, data: session } = authClient.useSession();
  const { setAdmin } = useAdminStore();
  const [companyName, setCompanyName] = useState<string | null>(null);
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
      const res = await getCompanyDetailByUsername(session.user.username);

      if (res.success && res.data) {
        setSlug(res.data.slug);
        setCompanyName(res.data.name);
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

  setAdmin({
    companyName: companyName,
    companySlug: slug,
    username: username,
    image: image,
  });

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
