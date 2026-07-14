"use server";

import GetCurrentUser from "@/src/shared/utils/get-currentUser";
import { auth } from "@/src/config/auth";
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

  const cachedUser = await GetCurrentUser(user.id);

  if (!cachedUser.success) {
    console.log(cachedUser.message);
    redirect("/signin");
  }

  const { role, memberships } = cachedUser.data;

  if (role === "CANDIDATE") {
    redirect(`/user/${user.username}`);
  }

  if (!memberships.length) {
    redirect("/");
  }

  redirect(`/${memberships[0].company.slug}/${role.toLowerCase()}`);
}
