"use client";

import React from "react";

interface SummaryCardProps {
  icon: React.ReactNode;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, value }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 md:gap-3 p-4 md:p-5 lg:p-6 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl md:rounded-2xl hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors">
      <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
        {icon}
      </div>
      <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl font-semibold text-center break-words">
        {value}
      </span>
    </div>
  );
};

export default SummaryCard;
