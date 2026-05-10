"use client";

import UserProfileSkeleton from "@/components/Skeletons/ProfileSkeleton/UserProfileSkeleton";
import React from "react";

const loading = () => {
  return <UserProfileSkeleton />;
};

export default loading;
