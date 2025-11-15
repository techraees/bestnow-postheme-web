"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface OrderSummaryProps {
  total: number;
  discount: number;
  deliveryCharges: number;
  totalPayable: number;
  paid: number;
  methodOfPayment: string;
  status: "completed" | "in-progress" | "canceled";
  newBalance: number;
  onViewScreenshot?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
  discount,
  deliveryCharges,
  totalPayable,
  paid,
  methodOfPayment,
  status,
  newBalance,
  onViewScreenshot,
}) => {
  const formatAmount = (amount: number) => {
    return `Rs. ${Math.abs(amount).toLocaleString("en-PK")}`;
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "text-green-500 dark:text-green-400";
      case "in-progress":
        return "text-light_mode_yellow_color dark:text-dark_mode_yellow_color";
      case "canceled":
        return "text-red-500 dark:text-red-400";
      default:
        return "text-light_mode_text dark:text-dark_mode_text";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-light_mode_color dark:bg-dark_mode_color  shadow-lg z-30">
      <div className="max-w-[1600px] mx-auto ">
        {/* Summary Section */}
        <div className="space-y-1 md:space-y-4 py-3 border-t border-light_mode_color3 dark:border-dark_mode_color3">
          {/* Total, Discount, Delivery */}
          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className=" text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              Total:
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-base font-semibold text-right">
              {formatAmount(total)}
            </span>
          </div>

          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className="text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              Discount:
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-base font-semibold text-right">
              {formatAmount(discount)}
            </span>
          </div>

          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className="text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              Delivery Charges:
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-semibold text-right">
              {formatAmount(deliveryCharges)}
            </span>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="space-y-1 py-3 md:space-y-4 border-t border-light_mode_color3 dark:border-dark_mode_color3 ">
          {/* Horizontal Line */}

          {/* Payment Details */}
          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className="text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              Total Payable:
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-base font-semibold text-right">
              {formatAmount(totalPayable)}
            </span>
          </div>

          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className="text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              Paid:
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-base font-semibold text-right">
              {formatAmount(paid)}
            </span>
          </div>

          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className="text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              MOP:
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-base font-semibold text-right">
              {methodOfPayment}
            </span>
          </div>

          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className="text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              Status:
            </span>
            <span
              className={`text-base md:text-base font-semibold flex items-center gap-1.5 justify-end ${getStatusColor()}`}
            >
              {status === "completed" && (
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
              )}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          <div className="flex justify-between items-center px-5 md:px-6 lg:px-8 xl:px-12">
            <span className="text-dark_mode_gray1_color dark:text-light_mode_gray1_color text-[16px] md:text-base">
              New Balance:
            </span>
            <span className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-base md:text-base font-semibold text-right">
              {formatAmount(newBalance)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {onViewScreenshot && (
          <div className="px-3 py-3 md:px-6 lg:px-8 xl:px-12">
            <button
              onClick={onViewScreenshot}
              className="w-full  bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black dark:text-black py-3 md:py-5 rounded-full font-semibold text-base md:text-base hover:opacity-90 active:scale-[0.98] transition-all duration-200"
            >
              View Screenshot
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
