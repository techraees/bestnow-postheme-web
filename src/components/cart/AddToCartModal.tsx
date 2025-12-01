"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import CartItem from "./CartItem";
import CartItemSkeleton from "./CartItemSkeleton";
import ConfirmModal from "../modal/ConfirmModal";
import { toast } from "react-toastify";
import {
  useGetCartQuery,
  useClearCartMutation,
} from "@/redux/api/core/cartApi";

interface CartItemData {
  id: string;
  product_name: string;
  price_rate: number;
  quantity: number;
  total_amount: number;
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
    <div className=" h-[230px] bottom-0 bg-light_mode_color dark:bg-dark_mode_color border-t border-light_mode_color2 dark:border-dark_mode_color2 shadow-lg z-30">
      <div className="max-w-[1600px] mx-auto px-4 py-4 ">
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
          className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-dark_mode_color dark:text-light_mode_text font-bold py-3 rounded-2xl text-sm md:text-base lg:text-lg transition-all active:scale-[0.98] shadow-md"
        >
          {isLoading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

const AddToCartModal = ({ closeModal }) => {
  const { data: cartData, isLoading, refetch } = useGetCartQuery();
  const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();

  const [items, setItems] = useState<CartItemData[]>([]);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Transform API response
  useEffect(() => {
    const apiItems =
      cartData?.payload?.results || cartData?.payload?.items || [];

    const mapped: CartItemData[] = apiItems.map((item: any) => ({
      id: item.id || item.cart_item_id || "",
      product_name: item.product_name || item.name || "",
      price_rate: item.price_rate || item.unitPrice || item.price || 0,
      quantity: item.quantity || item.item_quantity || 1,
      total_amount:
        (item.price_rate || item.unitPrice || item.price || 0) *
        (item.quantity || item.item_quantity || 1),
    }));

    setItems(mapped);
  }, [cartData]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    refetch();
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsCheckoutLoading(true);
    window.location.href = "/checkout"; // stays inside drawer
  };

  const handleClearCartConfirm = async () => {
    try {
      await clearCart().unwrap();
      setItems([]);
      setShowClearCartModal(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to clear cart");
      setShowClearCartModal(false);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price_rate * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="
        h-full 
        w-full 
        flex flex-col 
        bg-light_mode_color 
        dark:bg-dark_mode_color
      "
    >
      {/* HEADER */}
      <div className="px-4 py-5 border-b border-light_mode_color2 dark:border-dark_mode_color2 flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-semibold text-light_mode_text dark:text-dark_mode_text">
          My Cart
        </h1>

        <div className="flex items-center gap-4">
          {itemCount > 0 && (
            <span className="text-light_mode_text dark:text-dark_mode_text text-base">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </span>
          )}

          {items.length > 0 && (
            <button
              onClick={() => setShowClearCartModal(true)}
              disabled={isClearingCart}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
              <span className="hidden md:inline text-sm">Clear Cart</span>
            </button>
          )}
        </div>
      </div>

      {/* SCROLLABLE ITEMS */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <CartItemSkeleton key={i} />)
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <p className="text-xl font-semibold">Your cart is empty</p>
            <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color">
              Add some items to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.product_name}
                image="https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp"
                unitPrice={item.price_rate}
                quantity={item.quantity}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* FIXED BOTTOM SUMMARY */}
      {items.length > 0 && (
        <CartSummary
          total={total}
          previousBalance={0}
          discount={0}
          deliveryCharges={0}
          onCheckout={handleCheckout}
          isLoading={isCheckoutLoading}
        />
      )}

      {/* CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        onConfirm={handleClearCartConfirm}
        title="Clear Cart"
        message="Are you sure to clear cart?"
        confirmText="Clear Cart"
        cancelText="Cancel"
        isLoading={isClearingCart}
      />
    </div>
  );
};

export default AddToCartModal;
