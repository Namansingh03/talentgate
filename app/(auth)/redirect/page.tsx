"use server";

import { getUserDetailsByUserId } from "@/actions/company/company";
import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
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

  const res = await getUserDetailsByUserId(user.id);

  if (!res.success && !res.data) {
    throw new Error(res.message);
  }

  if (res.data) {
    const { role, slug } = res.data;

    if (role === "CANDIDATE") {
      redirect(`/user/${user.username}`);
    }

    redirect(`/${slug}/${role.toLowerCase()}`);
  }

  return (
    <div className="w-full h-screen flex items-centre justify-center">
      <Loader2 className="animate-spin ml-2" />
      Redirecting...
    </div>
  );
}
