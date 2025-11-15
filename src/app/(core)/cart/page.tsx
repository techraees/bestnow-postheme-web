"use client";

import React from "react";
import { CartScreen, CartItemData } from "@/components/cart";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";

// Sample cart data - in production, this would come from Redux store or API
const sampleCartItems: CartItemData[] = [
  {
    id: "1",
    name: "Lcd Screen Samsung A52s 5G Golden Crown brand",
    image:
      "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    unitPrice: 4280,
    quantity: 10,
  },
  {
    id: "2",
    name: "Charging Flex Cable, Perfect Fit Replacement",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
    unitPrice: 3450,
    quantity: 4,
  },
  {
    id: "3",
    name: "Apple air pods 3rd generation with Type-C cable",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
    unitPrice: 8360,
    quantity: 2,
  },
  {
    id: "4",
    name: "Lcd Screen Samsung A52s 5G Golden Crown brand",
    image:
      "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    unitPrice: 4280,
    quantity: 10,
  },
  {
    id: "5",
    name: "Lcd Screen Samsung A52s 5G Golden Crown brand",
    image:
      "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    unitPrice: 4280,
    quantity: 10,
  },
  {
    id: "6",
    name: "Charging Flex Cable, Perfect Fit Replacement",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
    unitPrice: 3450,
    quantity: 4,
  },
  {
    id: "7",
    name: "Apple air pods 3rd generation with Type-C cable",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
    unitPrice: 8360,
    quantity: 2,
  },
  {
    id: "8",
    name: "Lcd Screen Samsung A52s 5G Golden Crown brand",
    image:
      "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    unitPrice: 4280,
    quantity: 10,
  },
];

const CartPage = () => {
  const handleCheckout = async (items: CartItemData[]) => {
    console.log("Checkout initiated with items:", items);
    // Handle checkout logic here
    // You can navigate to checkout page, process payment, etc.
  };

  return (
    <TopSpacingWrapper>
      <CartScreen
        items={sampleCartItems}
        previousBalance={-45000}
        discount={0}
        deliveryCharges={120}
        onCheckout={handleCheckout}
      />
    </TopSpacingWrapper>
  );
};

export default CartPage;
