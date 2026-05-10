"use client";

import UserNavbar from "@/components/Candidate/CandidateNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <UserNavbar />
      <div>{children}</div>
    </div>
  );
}
