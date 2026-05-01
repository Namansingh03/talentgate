"use client";

import CandidateNavbar from "@/components/Candidate/CandidateNavbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <CandidateNavbar />
      <div>{children}</div>
    </div>
  );
}
