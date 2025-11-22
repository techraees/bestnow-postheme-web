"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CartScreen, CartItemData } from "@/components/cart";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { useGetCartQuery } from "@/redux/api/core/cartApi";
import { toast } from "react-toastify";

const CartPage = () => {
  const router = useRouter();
  const { data: cartData, isLoading, refetch: refetchCart } = useGetCartQuery();

  const handleCheckout = async (items: CartItemData[]) => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    router.push("/checkout");
  };

  const handleCartUpdate = () => {
    // Refetch cart data after any update
    refetchCart();
  };

  const handleClearCart = () => {
    // Refetch cart data after clearing
    refetchCart();
  };

  // Transform API response to match CartItemData interface
  const cartItems: CartItemData[] = (
    cartData?.payload?.results ||
    cartData?.payload?.items ||
    []
  ).map((item: any) => ({
    id: item.id || item.cart_item_id || "",
    product_name: item.product_name || item.name || "",
    price_rate: item.price_rate || item.unitPrice || item.price || 0,
    quantity: item.quantity || item.item_quantity || 1,
    total_amount:
      item.total_amount ||
      (item.price_rate || item.unitPrice || item.price || 0) *
        (item.quantity || item.item_quantity || 1),
  }));

  return (
    <TopSpacingWrapper>
      <CartScreen
        items={cartItems}
        previousBalance={cartData?.payload?.summary?.previous_balance || 0}
        discount={0}
        onCheckout={handleCheckout}
        onCartUpdate={handleCartUpdate}
        onClearCart={handleClearCart}
        isLoading={isLoading}
      />
    </TopSpacingWrapper>
  );
};

export default CartPage;
