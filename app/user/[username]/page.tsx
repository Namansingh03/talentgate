"use client";
import { useUserStore } from "@/utils/store";
import React from "react";

const UserDashboard = () => {
  const { image, role, username } = useUserStore();

  return (
    <div>
      `image : {image} role : {role} username : {username}`
    </div>
  );
};

export default UserDashboard;
