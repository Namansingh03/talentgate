"use client";

import UserNavbar from "@/components/Candidate/CandidateNavbar";
import UserNavbarSkeleton from "@/components/Skeletons/UserNavabarSkeleton";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-full flex w-full flex-col">
        <UserNavbarSkeleton />
        <p>loading ...</p>
      </div>
    );
  }

  if (!session?.user || !session.user.username) {
    redirect("/login");
  }

  return (
    <div className="min-h-full flex flex-col">
      <UserNavbar
        role="USER"
        username={session?.user.username}
        imageUrl={session.user.image ?? undefined}
      />
      <div>{children}</div>
    </div>
  );
}
