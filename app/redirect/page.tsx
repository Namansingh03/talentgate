// app/redirect/page.tsx

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const role = session.user.role;

  switch (role) {
    // case "ADMIN":
    //   redirect("/admin/dashboard");
    case "EMPLOYER":
      redirect("/employer");
    case "CANDIDATE":
      redirect("/candidate");
    default:
      redirect("/set-role");
  }
}
