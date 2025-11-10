"use client";

import React from "react";

interface CartSummaryProps {
  total: number;
  previousBalance?: number;
  discount?: number;
  deliveryCharges?: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  total,
  previousBalance = 0,
  discount = 0,
  deliveryCharges = 0,
  onCheckout,
  isLoading = false,
}) => {
  // Calculate total payable: total - discount + deliveryCharges + previousBalance
  // If previousBalance is negative (credit), it reduces the total
  const totalPayable = total - discount + deliveryCharges + previousBalance;

  const formatPrice = (price: number) => {
    return `Rs. ${Math.abs(price).toLocaleString("en-PK")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-light_mode_color dark:bg-dark_mode_color border-t border-light_mode_color2 dark:border-dark_mode_color2 shadow-lg z-30">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5 lg:py-6">
        {/* Summary Details */}
        <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
          <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
            <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
              Total
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
              {formatPrice(total)}
            </span>
          </div>

          {previousBalance !== 0 && (
            <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
              <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                Prev. Bal
              </span>
              <span
                className={`font-semibold ${
                  previousBalance < 0
                    ? "text-red-500 dark:text-red-400"
                    : "text-light_mode_text dark:text-dark_mode_text"
                }`}
              >
                {formatPrice(previousBalance)}
              </span>
            </div>
          )}

          {discount !== 0 && (
            <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
              <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                Discount
              </span>
              <span className="text-green-500 dark:text-green-400 font-semibold">
                -{formatPrice(discount)}
              </span>
            </div>
          )}

          {deliveryCharges !== 0 && (
            <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
              <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                Delivery Charges
              </span>
              <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                {formatPrice(deliveryCharges)}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-light_mode_color2 dark:border-dark_mode_color2 my-2 md:my-3 pt-2 md:pt-3"></div>

          {/* Total Payable */}
          <div className="flex justify-between items-center">
            <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
              Total Payable
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
              {formatPrice(totalPayable)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={isLoading || totalPayable <= 0}
          className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-dark_mode_color dark:text-light_mode_text font-bold py-3 md:py-4 lg:py-5 rounded-2xl text-sm md:text-base lg:text-lg transition-all active:scale-[0.98] shadow-md"
        >
          {isLoading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;

