import AdminNavbar from "@/components/company/AdminNavbar";
import React from "react";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <AdminNavbar />
      {children}
    </div>
  );
};
