import React from "react";

const PostDetailCardSkeletal: React.FC = () => {
  return (
    <div className=" h-[615px] p-2 bg-white dark:bg-dark_mode_primary_overlay_5 flex flex-col justify-between">
      <div>
        <div className="h-[25px] w-[80%] mb-3 animate-pulse bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16"></div>
        <div className="h-[350px] w-[100%] mb-3 animate-pulse bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16"></div>
        <div>
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[100%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[10px] w-[30%] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
        </div>
      </div>
      <div className="flex justify-between mt-1 mb-1">
        <div className="flex gap-3">
          <div className="h-[28px] w-[28px] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[28px] w-[28px] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="h-[28px] w-[28px] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
        </div>

        <div className="h-[28px] w-[28px] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
      </div>
      <div className="flex justify-end gap-3">
        <div className="h-[14px] w-[70px] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
        <div className="h-[14px] w-[70px] rounded-full animate-pulse mb-1.5 bg-light_mode_primary_1 dark:bg-dark_mode_primary_overlay_16" />
      </div>
    </div>
  );
};

export default PostDetailCardSkeletal;
