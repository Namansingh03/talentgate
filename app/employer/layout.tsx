"use client";

import EmployerNavbar from "@/components/employer/EmployerNavbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <EmployerNavbar />
      <div>{children}</div>
    </div>
  );
}
