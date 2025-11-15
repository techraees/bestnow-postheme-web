"use client";

import React from "react";

interface ClosingBalanceCardProps {
  balance: string;
}

const ClosingBalanceCard: React.FC<ClosingBalanceCardProps> = ({ balance }) => {
  return (
    <div className="w-full p-3 md:p-5 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full">
      <div className="flex justify-between items-center">
        <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
          Closing Balance
        </span>
        <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-lg md:text-xl font-semibold">
          {balance}
        </span>
      </div>
    </div>
  );
};

export default ClosingBalanceCard;
