"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HiMinus, HiPlus } from "react-icons/hi";
import { ChevronDown, ChevronUp, Trash2, X } from "lucide-react";
import {
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "@/redux/api/core/cartApi";
import { toast } from "react-toastify";
import CartItemSkeleton from "./CartItemSkeleton";

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onUpdateSuccess?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  image,
  unitPrice,
  quantity: initialQuantity,
  onQuantityChange,
  onRemove,
  onUpdateSuccess,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: isRemoving }] =
    useRemoveCartItemMutation();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync quantity when prop changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleQuantityUpdate = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    const previousQuantity = quantity;
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);

    try {
      await updateCartItem({
        cartItemId: id,
        quantity: newQuantity,
      }).unwrap();
      // toast.success("Cart updated");
      onUpdateSuccess?.();
    } catch (error: any) {
      // Revert on error
      setQuantity(previousQuantity);
      onQuantityChange(id, previousQuantity);
      toast.error(error?.data?.message || "Failed to update cart");
    }
  };

  const handleDelete = async () => {
    if (!onRemove) return;

    try {
      await removeCartItem({ cartItemId: id }).unwrap();
      // toast.success("Item removed from cart");
      onRemove(id);
      onUpdateSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to remove item");
    }
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      await handleQuantityUpdate(quantity - 1);
    }
  };

  const handleIncrease = async () => {
    await handleQuantityUpdate(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = value === "" ? 1 : parseInt(value, 10);
      const validQuantity = Math.max(1, numValue);
      setQuantity(validQuantity);
      onQuantityChange(id, validQuantity);

      // Clear previous debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Debounce API call - wait 500ms after user stops typing
      debounceTimerRef.current = setTimeout(async () => {
        if (validQuantity !== initialQuantity && validQuantity >= 1) {
          await handleQuantityUpdate(validQuantity);
        }
      }, 500);
    }
  };

  const handleInputBlur = async () => {
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    // Ensure minimum quantity
    if (quantity < 1) {
      const validQuantity = 1;
      setQuantity(validQuantity);
      await handleQuantityUpdate(validQuantity);
    } else if (quantity !== initialQuantity) {
      // Update immediately on blur if quantity changed
      await handleQuantityUpdate(quantity);
    }
  };

  const totalPrice = unitPrice * quantity;
  const formattedUnitPrice = `Rs. ${unitPrice.toLocaleString("en-PK")}`;
  const formattedTotalPrice = `Rs. ${totalPrice.toLocaleString("en-PK")}`;
  const isLoading = isUpdating || isRemoving;

  return (
    <div className="relative bg-light_mode_color dark:bg-dark_mode_color rounded-2xl p-1 md:p-4 lg:p-5 transition-shadow">
      {/* Loading Skeleton */}
      {isLoading && <CartItemSkeleton />}

      {/* Cart Item Content - Hidden when loading */}
      {!isLoading && (
        <>
          {/* Delete Button - Top Right */}
          <button
            onClick={handleDelete}
            disabled={isRemoving}
            className="absolute top-2 right-2 z-10   disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove item from cart"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-light_mode_red_color dark:text-dark_mode_red_color" />
          </button>

          <div className="flex gap-3 md:gap-4 lg:gap-5">
            {/* Product Image */}
            <div className="relative shrink-0 w-[100px] h-[100px] md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image
                src={image}
                alt={name}
                fill
                className="object-fill"
                sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              {/* Product Name and Unit Price */}
              <div className="flex-1 mb-0 md:mb-3">
                <h3 className="text-light_mode_text dark:text-dark_mode_text opacity-85 text-sm md:text-base lg:text-lg font-medium line-clamp-2 mb-1 md:mb-2 leading-tight">
                  {name}
                </h3>
                <p className="text-light_mode_text dark:text-dark_mode_text text-[16px] lg:text-base font-[400]">
                  {formattedUnitPrice}
                </p>
              </div>

              {/* Quantity Controls and Total Price */}
              <div className="flex items-center justify-between gap-3 md:gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm gap-2 md:gap-3">
                  {/* Decrease */}
                  <button
                    onClick={handleDecrease}
                    disabled={isUpdating || isRemoving || quantity <= 1}
                    className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px] flex justify-center items-center cursor-pointer text-dark_mode_color dark:text-light_mode_color hover:opacity-80 active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <ChevronDown size={20} />
                  </button>

                  {/* Quantity Input */}
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    disabled={isUpdating || isRemoving}
                    className="w-[32px] text-center bg-transparent border-none outline-none text-light_mode_text dark:text-dark_mode_text text-sm font-medium focus:ring-0 p-0 disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  {/* Increase */}
                  <button
                    onClick={handleIncrease}
                    disabled={isUpdating || isRemoving}
                    className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px] flex justify-center items-center cursor-pointer text-light_mode_yellow_color dark:text-dark_mode_yellow_color hover:opacity-80 active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <ChevronUp size={20} />
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-right">
                  <p className="text-light_mode_text dark:text-dark_mode_text text-[16px] md:text-base lg:text-lg font-bold">
                    {formattedTotalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
