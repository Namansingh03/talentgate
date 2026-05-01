"use client";

import React from "react";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
  />
);

const NavbarSkeleton = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-5">
      {/* Left Section */}
      <div className="flex flex-row gap-x-10 items-center">
        {/* Logo */}
        <SkeletonBox className="h-8 w-32" />

        {/* Nav Links */}
        <div className="flex flex-row gap-x-8 items-center">
          <SkeletonBox className="h-4 w-24" />
          <SkeletonBox className="h-4 w-20" />
          <SkeletonBox className="h-4 w-24" />
        </div>
      </div>

      {/* Right Section (Avatar) */}
      <div className="flex flex-row items-center gap-x-3">
        <SkeletonBox className="h-10 w-10 rounded-full" />
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
