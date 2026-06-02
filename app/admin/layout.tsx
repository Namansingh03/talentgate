import AdminNavbar from "@/components/company/AdminNavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <AdminNavbar />
      {children}
    </div>
  );
};

export default layout;
