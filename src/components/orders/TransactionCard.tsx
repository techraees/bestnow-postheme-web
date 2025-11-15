"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle2, XCircle, ChevronRight } from "lucide-react";

export type TransactionStatus = "in-progress" | "complete" | "canceled";

interface TransactionCardProps {
  id: string;
  transactionId: string;
  time: string;
  status: TransactionStatus;
  amount: string;
  index: number;
  onClick?: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  id,
  transactionId,
  time,
  status,
  amount,
  index,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    router.push(`/orders/${id}`);
  };

  const getStatusConfig = () => {
    switch (status) {
      case "in-progress":
        return {
          icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />,
          text: "In-Progress",
          color:
            "text-light_mode_yellow_color dark:text-dark_mode_yellow_color",
        };
      case "complete":
        return {
          icon: <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />,
          text: "Complete",
          color: "text-green-500 dark:text-green-400",
        };
      case "canceled":
        return {
          icon: <XCircle className="w-4 h-4 md:w-5 md:h-5" />,
          text: "Canceled",
          color: "text-red-500 dark:text-red-400",
        };
      default:
        return {
          icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />,
          text: "In-Progress",
          color:
            "text-light_mode_yellow_color dark:text-dark_mode_yellow_color",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex items-center gap-2">
      <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium shrink-0 w-6 md:w-8 text-left">
        {String(index).padStart(2, "0")}
      </span>
      <button
        onClick={handleClick}
        className="w-full flex-1 flex items-center gap-3 md:gap-4 p-4.5 md:p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-3xl hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 active:scale-[0.98] transition-all duration-200"
      >
        {/* Index Number */}

        {/* Transaction Details */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-semibold text-left">
            {transactionId}
          </span>
          <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm text-left">
            {time}
          </span>
        </div>

        {/* Status and Amount */}
        <div className="flex flex-col items-end gap-2 shrink-0 ">
          <div className={`flex items-center gap-1.5 ${statusConfig.color}`}>
            {statusConfig.icon}
            <span className="text-sm md:text-base font-medium">
              {statusConfig.text}
            </span>
          </div>
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

export default TransactionCard;
