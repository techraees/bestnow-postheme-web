"use client";

import React from "react";

interface SummaryCardProps {
  icon: React.ReactNode;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, value }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-4 md:p-5 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl ">
      <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
        {icon}
      </div>
      <span className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-semibold">
        {value}
      </span>
    </div>
  );
};

export default SummaryCard;
