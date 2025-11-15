"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import { OrderItem, OrderSummary } from "@/components/orders";

interface OrderItemData {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

interface OrderData {
  id: string;
  orderId: string;
  date: string;
  time: string;
  items: OrderItemData[];
  total: number;
  discount: number;
  deliveryCharges: number;
  totalPayable: number;
  paid: number;
  methodOfPayment: string;
  status: "completed" | "in-progress" | "canceled";
  newBalance: number;
}

// Sample order data - in production, this would come from API
const sampleOrder: OrderData = {
  id: "1",
  orderId: "76052",
  date: "09 July, 2025",
  time: "05:42 pm",
  items: [
    {
      id: "1",
      name: "Charging Flex Cable, Perfect Fit Replacement",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
      unitPrice: 3450,
      quantity: 4,
    },
    {
      id: "2",
      name: "Apple air pods 3rd generation with Type-C cable",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
      unitPrice: 8360,
      quantity: 2,
    },
    {
      id: "3",
      name: "Lcd Screen Samsung A52s 5G Golden Crown brand",
      image:
        "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
      unitPrice: 4280,
      quantity: 24,
    },
    {
      id: "4",
      name: "Charging Flex Cable, Perfect Fit Replacement",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
      unitPrice: 3450,
      quantity: 4,
    },
    {
      id: "5",
      name: "Apple air pods 3rd generation with Type-C cable",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
      unitPrice: 8360,
      quantity: 2,
    },
    {
      id: "6",
      name: "Lcd Screen Samsung A52s 5G Golden Crown brand",
      image:
        "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
      unitPrice: 4280,
      quantity: 24,
    },
  ],
  total: 73320,
  discount: 0,
  deliveryCharges: 120,
  totalPayable: 28440,
  paid: 28400,
  methodOfPayment: "Transfer",
  status: "completed",
  newBalance: 40,
};

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  // In production, fetch order data based on orderId
  const order = sampleOrder;

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewScreenshot = () => {
    console.log("View screenshot clicked");
    // Navigate to screenshot view or open modal
  };

  return (
    <TopSpacingWrapper>
      <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
        {/* Header */}
        <SubHeader
          title={`Order ID (${order.orderId})`}
          subtitle={`${totalItems} Items`}
        />

        {/* Order Date and Time */}
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-2 pb-4">
          <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
            {order.date} {order.time}
          </p>
        </div>

        {/* Order Items List - Scrollable */}
        <div className="max-w-[1600px] overflow-y-auto mx-auto h-[calc(100vh-500px)] w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
          {order.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
                No items found
              </p>
            </div>
          ) : (
            <div className="space-y-1 md:space-y-4 lg:space-y-5 max-w-4xl mx-auto">
              {order.items.map((item) => (
                <OrderItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  unitPrice={item.unitPrice}
                  quantity={item.quantity}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Summary */}
      <OrderSummary
        total={order.total}
        discount={order.discount}
        deliveryCharges={order.deliveryCharges}
        totalPayable={order.totalPayable}
        paid={order.paid}
        methodOfPayment={order.methodOfPayment}
        status={order.status}
        newBalance={order.newBalance}
        onViewScreenshot={handleViewScreenshot}
      />
    </TopSpacingWrapper>
  );
};

export default OrderDetailPage;
