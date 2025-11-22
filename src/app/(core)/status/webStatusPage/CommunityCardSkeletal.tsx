import React from "react";

const CommunityCardSkeletal: React.FC = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="h-[36px] w-[36px] rounded-full animate-pulse mb-1.5 bg-light_mode_color2 dark:bg-dark_mode_color2" />
          <div className="flex flex-col gap-1">
            <div className="h-[12px] w-[130px] rounded-full animate-pulse mb-1.5 bg-light_mode_color2 dark:bg-dark_mode_color2" />
            <div className="h-[12px] w-[110px] rounded-full animate-pulse mb-1.5 bg-light_mode_color2 dark:bg-dark_mode_color2" />
          </div>
        </div>
        <div className="h-[18px] w-[50px] rounded-md animate-pulse mb-1.5 bg-light_mode_color2 dark:bg-dark_mode_color2" />
      </div>
    </div>
  );
};

export default CommunityCardSkeletal;
