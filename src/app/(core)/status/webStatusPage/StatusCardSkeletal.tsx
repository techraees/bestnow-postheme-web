import React from "react";

const StatusCardSkeletal: React.FC = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="h-[60px] w-[60px] rounded-full animate-pulse mb-1.5 bg-chat_light_color1 dark:bg-dark_mode_primary_overlay_16" />
          <div className="flex flex-col gap-1">
            <div className="h-[18px] w-[130px] rounded-full animate-pulse mb-1.5 bg-chat_light_color1 dark:bg-dark_mode_primary_overlay_16" />
            <div className="h-[12px] w-[110px] rounded-full animate-pulse mb-1.5 bg-chat_light_color1 dark:bg-dark_mode_primary_overlay_16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCardSkeletal;
