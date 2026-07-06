"use client";

import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/utils/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, isPending } = authClient.useSession();
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/");
      return;
    }

    const user = session.user;
    const role = session.user.role;

    if (!user.username) {
      router.replace("/setUsername");
    } else if (role === "CANDIDATE") {
      router.replace(`/${user.username}`);
      setUser({ image: user.image, role: role, username: user.username });
    } else {
      router.push(`/${role?.toLowerCase()}`);
      setUser({ image: user.image, role: role, username: user.username });
    }
  }, [session, isPending, router, setUser]);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-sm text-muted-foreground">
        <Loader2 className="animate-spin" />
        redirecting...
      </p>
    </div>
  );
}
