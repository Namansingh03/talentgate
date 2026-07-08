"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import CompanyLayoutShell from "./CompanyLayoutShell";
import GetCurrentUser from "@/helpers/get-currentUser";

interface layoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function Layout({ children, params }: layoutProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const user = await GetCurrentUser(session.user.id);

  if (!user) {
    redirect("/signin");
  }

  return (
    <CompanyLayoutShell
      email={user.email}
      image={user.image}
      name={user.name}
      role={user.role}
      slug={slug}
    >
      {children}
    </CompanyLayoutShell>
  );
}
