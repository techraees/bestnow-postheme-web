"use client";

import React from "react";

interface DebitCreditCardProps {
  amount: string;
  label: string; // "Debit" or "Credit"
}

const DebitCreditCard: React.FC<DebitCreditCardProps> = ({ amount, label }) => {
  return (
    <div className="flex flex-col gap-0 p-6 md:p-5 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-3xl">
      <span className="text-light_mode_yellow_color text-center dark:text-dark_mode_yellow_color text-[13px] md:text-xl font-semibold">
        {amount}
      </span>
      <span className="text-light_mode_gray_color text-center dark:text-dark_mode_gray_color text-[12px] md:text-base">
        {label}
      </span>
    </div>
  );
};

export default DebitCreditCard;
