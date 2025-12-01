"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import {
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "@/redux/api/core/cartApi";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

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
  const minQty = 1;

  const [draftQty, setDraftQty] = useState(String(initialQuantity));
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: isRemoving }] =
    useRemoveCartItemMutation();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external quantity
  useEffect(() => {
    setDraftQty(String(initialQuantity));
  }, [initialQuantity]);

  // Parse helper
  const parseDraft = () => {
    const n = parseInt(draftQty, 10);
    return Number.isFinite(n) ? n : NaN;
  };

  // Debounced update function
  const debouncedUpdate = (val: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      await handleQuantityUpdate(val);
    }, 500);
  };

  // API update
  const handleQuantityUpdate = async (newQuantity: number) => {
    const previousQuantity = initialQuantity;
    onQuantityChange(id, newQuantity);

    try {
      await updateCartItem({
        cartItemId: id,
        quantity: newQuantity,
      }).unwrap();

      onUpdateSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update cart");
      onQuantityChange(id, previousQuantity);
      setDraftQty(String(previousQuantity));
    }
  };

  // Clamp & commit
  const commitClamp = async () => {
    const n = parseDraft();
    const clamped = Number.isFinite(n)
      ? Math.min(Math.max(n, minQty), 100000000)
      : minQty;

    setDraftQty(String(clamped));
    debouncedUpdate(clamped);
  };

  // Increment
  const handleIncrease = () => {
    const n = parseDraft();
    const base = Number.isFinite(n) ? n : minQty;
    const next = base + 1;

    setDraftQty(String(next));
    debouncedUpdate(next);
  };

  // Decrement
  const handleDecrease = () => {
    const n = parseDraft();
    const base = Number.isFinite(n) ? n : minQty;
    const next = Math.max(base - 1, minQty);

    setDraftQty(String(next));
    debouncedUpdate(next);
  };

  // Input typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^\d]/g, "");
    setDraftQty(clean);

    const n = parseInt(clean, 10);
    if (Number.isFinite(n)) {
      debouncedUpdate(n);
    }
  };

  const handleInputBlur = async () => commitClamp();
  const handleQtyKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitClamp();
  };

  // Delete item
  const handleDelete = async () => {
    if (!onRemove) return;

    try {
      await removeCartItem({ cartItemId: id }).unwrap();
      onRemove(id);
      onUpdateSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to remove item");
    }
  };

  const currentQuantity = parseInt(draftQty, 10) || minQty;
  const formattedUnitPrice = `Rs. ${unitPrice.toLocaleString("en-PK")}`;
  const formattedTotalPrice = `Rs. ${(
    unitPrice * currentQuantity
  ).toLocaleString("en-PK")}`;

  return (
    <div className="relative bg-light_mode_color dark:bg-dark_mode_color rounded-2xl p-1 md:p-4 lg:p-3 shadow-sm">
      {/* DELETE BUTTON WITH LOADER BEHIND */}
      <div className="absolute top-2 right-2 z-20 flex items-center justify-center w-8 h-8">
        {/* Loader BEHIND delete icon */}
        {(isRemoving || isUpdating) && (
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <ClipLoader size={20} color="#fbbf24" />
          </div>
        )}

        {/* Delete Icon on TOP */}
        <button
          onClick={handleDelete}
          disabled={isRemoving || isUpdating}
          className="z-10 disabled:opacity-40"
        >
          <Trash2 className="w-5 h-5 text-light_mode_red_color dark:text-dark_mode_red_color" />
        </button>
      </div>

      {/* CONTENT AREA */}
      <div
        className={`${
          isRemoving || isUpdating ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <div className="flex gap-3">
          {/* IMAGE */}
          <div className="relative w-[100px] h-[100px] bg-white rounded-xl overflow-hidden border">
            <Image src={image} alt={name} fill className="object-fill" />
          </div>

          {/* DETAILS */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-light_mode_text dark:text-dark_mode_text text-sm font-medium line-clamp-2">
                {name}
              </h3>
              <p className="text-light_mode_text dark:text-dark_mode_text">
                {formattedUnitPrice}
              </p>
            </div>

            {/* QTY + TOTAL */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrease}
                  type="button"
                  disabled={
                    isUpdating || isRemoving || currentQuantity <= minQty
                  }
                  className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px]"
                >
                  <ChevronDown size={20} />
                </button>

                <input
                  type="text"
                  inputMode="numeric"
                  value={draftQty}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleQtyKeyDown}
                  className="w-[34px] text-center bg-transparent outline-none"
                />

                <button
                  onClick={handleIncrease}
                  type="button"
                  disabled={isUpdating || isRemoving}
                  className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px]"
                >
                  <ChevronUp size={20} />
                </button>
              </div>

              <div className="text-right font-bold text-light_mode_text dark:text-dark_mode_text">
                {formattedTotalPrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
