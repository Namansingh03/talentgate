"use server";

import { getCompanyDetailByUsername } from "@/actions/company/company";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const { user } = session;

  if (!user.username) {
    redirect("/setUsername");
  }

  if (user.role === "CANDIDATE") {
    redirect(`/user/${user.username}`);
  }

  const res = await getCompanyDetailByUsername(user.username);

  if (!res.success) {
    throw new Error("Company not found");
  }

  redirect(`/${res.data?.slug}/${user.role}`);
}
