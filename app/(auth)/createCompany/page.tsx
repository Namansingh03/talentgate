import React from "react";
import CompanyForm from "@/components/company/CompanyForm";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-5 bg-linear-to-br from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      <CompanyForm />
    </div>
  );
};

export default page;
