"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface LedgerTransactionCardProps {
  id: string;
  transactionId: string;
  time: string;
  paymentType: string; // "Transfer" or "Cash"
  amount: string;
  index: number;
  onClick?: () => void;
}

const LedgerTransactionCard: React.FC<LedgerTransactionCardProps> = ({
  id,
  transactionId,
  time,
  paymentType,
  amount,
  index,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    // Navigate to transaction detail if needed
    // router.push(`/ledger/${id}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium shrink-0 w-6 md:w-8 text-left">
        {String(index).padStart(2, "0")}
      </span>
      <button
        onClick={handleClick}
        className="w-full flex-1 flex items-center gap-3 md:gap-4 p-4.5 md:p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-3xl hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 active:scale-[0.98] transition-all duration-200"
      >
        {/* Transaction Details */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-semibold text-left">
            {transactionId}
          </span>
          <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm text-left">
            {time}
          </span>
        </div>

        {/* Payment Type and Amount */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base font-medium">
            {paymentType}
          </span>
          <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-semibold">
            {amount}
          </span>
        </div>

        {/* Arrow Icon */}
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-light_mode_text dark:text-dark_mode_text opacity-60 shrink-0" />
      </button>
    </div>
  );
};

export default LedgerTransactionCard;

