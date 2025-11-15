"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import SubHeader from "../navigation/SubHeader";

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
    <div className="min-h-[calc(100vh-230px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
      {/* Header */}
      <SubHeader title="My Cart" itemCount={itemCount} />

      {/* Cart Items List - Scrollable */}
      <div className="max-w-[1600px]  overflow-y-auto mx-auto h-[calc(100vh-340px)] px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-10">
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
          <div className="space-y-1 md:space-y-4 lg:space-y-5 max-w-4xl mx-auto">
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
