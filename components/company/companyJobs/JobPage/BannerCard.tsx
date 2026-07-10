import React from "react";

interface bannerCardsInterface {
  title: string;
  value: number;
  description?: string;
}

const BannerCard = (bannerCardProps: bannerCardsInterface) => {
  return (
    <div className="w-60 h-md p-6 rounded-lg shadow-md border border-neutral-400 flex flex-col gap-y-5">
      <h1 className="text-md capitalize font-semibold text-neutral-500">
        {bannerCardProps.title}
      </h1>
      <p className="text-3xl font-bold text-indigo-900">
        {bannerCardProps.value}
        {bannerCardProps.description && (
          <span className="text-sm ml-2 text-green-500">
            {bannerCardProps.description}
          </span>
        )}
      </p>
    </div>
  );
};

export default BannerCard;
