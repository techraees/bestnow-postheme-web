"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export interface CartItemData {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

interface CartScreenProps {
  items?: CartItemData[];
  previousBalance?: number;
  discount?: number;
  deliveryCharges?: number;
  onCheckout?: (items: CartItemData[]) => void;
}

const CartScreen: React.FC<CartScreenProps> = ({
  items: initialItems = [],
  previousBalance = -45000,
  discount = 0,
  deliveryCharges = 120,
  onCheckout,
}) => {
  const router = useRouter();
  const [items, setItems] = useState<CartItemData[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-[calc(100vh-50px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
      {/* Header */}
      <div className="bg-light_mode_color dark:bg-dark_mode_color border-b border-light_mode_color2 dark:border-dark_mode_color2">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={handleBack}
                className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-2 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
                aria-label="Go back"
              >
                <HiArrowLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
              </button>
              <h1 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-bold">
                My Cart
              </h1>
            </div>
            <div className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl font-semibold">
              {itemCount.toString().padStart(2, "0")}{" "}
              {itemCount === 1 ? "Item" : "Items"}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items List - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-36 md:pb-44 lg:pb-48">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-10">
          {items.length === 0 ? (
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
            <div className="space-y-3 md:space-y-4 lg:space-y-5 max-w-4xl mx-auto">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  unitPrice={item.unitPrice}
                  quantity={item.quantity}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Summary */}
      {items.length > 0 && (
        <CartSummary
          total={total}
          previousBalance={previousBalance}
          discount={discount}
          deliveryCharges={deliveryCharges}
          onCheckout={handleCheckout}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default CartScreen;
