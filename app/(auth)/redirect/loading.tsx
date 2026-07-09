import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-centre justify-centre">
      <Loader2 className="animate-spin" /> redirecting...
    </div>
  );
};

export default loading;
