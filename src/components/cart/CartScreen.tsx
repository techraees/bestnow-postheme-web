"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { Trash2 } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartItemSkeleton from "./CartItemSkeleton";
import SubHeader from "../navigation/SubHeader";
import { useClearCartMutation } from "@/redux/api/core/cartApi";
import { toast } from "react-toastify";
import ConfirmModal from "../modal/ConfirmModal";

export interface CartItemData {
  id: string;
  product_name: string;
  price_rate: number;
  quantity: number;
  total_amount: number;
}

interface CartScreenProps {
  items?: CartItemData[];
  previousBalance?: number;
  discount?: number;
  deliveryCharges?: number;
  onCheckout?: (items: CartItemData[]) => void;
  onCartUpdate?: () => void;
  isLoading?: boolean;
  onClearCart?: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({
  items: initialItems = [],
  previousBalance = -45000,
  discount = 0,
  deliveryCharges = 120,
  onCheckout,
  onCartUpdate,
  isLoading = false,
  onClearCart,
}) => {
  const router = useRouter();
  const [items, setItems] = useState<CartItemData[]>(initialItems);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    onCartUpdate?.();
  };

  const handleUpdateSuccess = () => {
    onCartUpdate?.();
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      if (onCheckout) {
        await onCheckout(items);
      } else {
        // Default checkout behavior
        console.log("Checkout items:", items);
        // Navigate to checkout page or handle checkout
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleClearCartClick = () => {
    if (items.length === 0) return;
    setShowClearCartModal(true);
  };

  const handleClearCartConfirm = async () => {
    try {
      await clearCart().unwrap();
      setItems([]);
      setShowClearCartModal(false);
      // toast.success("Cart cleared successfully");
      onClearCart?.();
      onCartUpdate?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to clear cart");
      setShowClearCartModal(false);
    }
  };

  const handleCloseModal = () => {
    if (!isClearingCart) {
      setShowClearCartModal(false);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price_rate * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);
  console.log(items);

  return (
    <div className="min-h-[calc(100vh-230px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
      {/* Header with Clear Cart Button */}
      <div className="bg-light_mode_color dark:bg-dark_mode_color">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0 md:gap-4">
              <h1 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-[500]">
                My Cart
              </h1>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              {itemCount > 0 && (
                <div className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl">
                  {itemCount.toString().padStart(2, "0")}{" "}
                  {itemCount === 1 ? "Item" : "Items"}
                </div>
              )}
              {/* Clear Cart Button */}
              {items.length > 0 && !isLoading && (
                <button
                  onClick={handleClearCartClick}
                  disabled={isClearingCart}
                  className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2"
                  aria-label="Clear cart"
                >
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Clear Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items List - Scrollable */}
      <div className="w-full max-w-[1600px] overflow-y-auto mx-auto h-[calc(100vh-340px)] px-4 py-2">
        {isLoading ? (
          // Loading Skeleton
          <div className="space-y-1 md:space-y-4 lg:space-y-5 mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <CartItemSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
            <div className="text-light_mode_text dark:text-dark_mode_text text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">
                Your cart is empty
              </p>
              <p className="text-sm md:text-base lg:text-lg text-light_mode_gray_color dark:text-dark_mode_gray_color">
                Add some items to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1 md:space-y-4 lg:space-y-5  mx-auto">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.product_name}
                image={
                  "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp"
                }
                unitPrice={item.price_rate}
                quantity={item.quantity}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                onUpdateSuccess={handleUpdateSuccess}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Summary */}
      {items.length > 0 && (
        <CartSummary
          total={total}
          previousBalance={previousBalance}
          discount={discount}
          deliveryCharges={deliveryCharges}
          onCheckout={handleCheckout}
          isLoading={isCheckoutLoading}
        />
      )}

      {/* Clear Cart Confirmation Modal */}
      <ConfirmModal
        isOpen={showClearCartModal}
        onClose={handleCloseModal}
        onConfirm={handleClearCartConfirm}
        title="Clear Cart"
        message="Are you sure to clear cart?"
        confirmText="Clear Cart"
        cancelText="Cancel"
        isLoading={isClearingCart}
        confirmButtonColor="bg-light_mode_red_color dark:bg-dark_mode_red_color"
      />
    </div>
  );
};

export default CartScreen;
