"use server";

import { auth } from "@/src/config/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import CompanyLayoutShell from "./CompanyLayoutShell";
import GetCurrentUser from "@/src/shared/utils/get-currentUser";

interface layoutProps {
  children: React.ReactNode;
  params: {
    companySlug: string;
  };
}

export default async function Layout({ children, params }: layoutProps) {
  const { companySlug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const res = await GetCurrentUser(session.user.id);

  if (!res.success) {
    redirect("/signin");
  }

  const { image, name, role } = res.data;

  return (
    <CompanyLayoutShell
      image={image}
      name={name}
      role={role}
      slug={companySlug}
    >
      {children}
    </CompanyLayoutShell>
  );
}
