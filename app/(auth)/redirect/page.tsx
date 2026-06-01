"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/signin");
      return;
    }

    const user = session.user;
    const role = session.user.role;

    if (!user.username) {
      router.replace("/setUsername");
    } else if (role === "ADMIN") {
      router.replace("/admin");
    } else {
      router.replace(`/${user.username}`);
    }
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </div>
  );
}
