"use client";

import React from "react";
import { useParams } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import { ReplaceItem } from "@/components/replace";
import { CheckCircle2 } from "lucide-react";

interface ReplaceItemData {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

interface ReplaceData {
  id: string;
  replaceId: string;
  date: string;
  time: string;
  items: ReplaceItemData[];
  total: number;
  status: "completed" | "in-progress" | "canceled";
}

// Sample replace data - in production, this would come from API
const sampleReplace: ReplaceData = {
  id: "1",
  replaceId: "RP76052",
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
  ],
  total: 73320,
  status: "completed",
};

const ReplaceDetailPage = () => {
  const params = useParams();
  const replaceId = params?.id as string;

  // In production, fetch replace data based on replaceId
  const replace = sampleReplace;

  const totalItems = replace.items.reduce((sum, item) => sum + item.quantity, 0);

  const getStatusColor = () => {
    switch (replace.status) {
      case "completed":
        return "text-green-500 dark:text-green-400";
      case "in-progress":
        return "text-light_mode_yellow_color dark:text-dark_mode_yellow_color";
      case "canceled":
        return "text-red-500 dark:text-red-400";
      default:
        return "text-light_mode_text dark:text-dark_mode_text";
    }
  };

  const handleItemDetailsClick = (itemId: string) => {
    console.log("Item details clicked:", itemId);
    // Navigate to item details or show modal
  };

  return (
    <TopSpacingWrapper>
      <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
        {/* Header */}
        <SubHeader
          title={`Replace ID (${replace.replaceId})`}
          subtitle={`${totalItems} Items`}
        />

        {/* Replace Date and Time */}
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-2 pb-4">
          <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
            {replace.date} {replace.time}
          </p>
        </div>

        {/* Replace Items List - Scrollable */}
        <div className="max-w-[1600px] overflow-y-auto mx-auto h-[calc(100vh-400px)] w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
          {replace.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
                No items found
              </p>
            </div>
          ) : (
            <div className="space-y-1 md:space-y-4 lg:space-y-5 max-w-4xl mx-auto">
              {replace.items.map((item) => (
                <ReplaceItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  unitPrice={item.unitPrice}
                  quantity={item.quantity}
                  onDetailsClick={() => handleItemDetailsClick(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Fixed Bottom Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-light_mode_color dark:bg-dark_mode_color border-t border-light_mode_color3 dark:border-dark_mode_color3 shadow-lg z-30">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
            <div className="space-y-3 md:space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                  Total:
                </span>
                <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-semibold text-right">
                  Rs. {replace.total.toLocaleString("en-PK")}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                  Status:
                </span>
                <span
                  className={`text-base md:text-lg font-semibold flex items-center gap-1.5 justify-end ${getStatusColor()}`}
                >
                  {replace.status === "completed" && (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                  {replace.status.charAt(0).toUpperCase() + replace.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default ReplaceDetailPage;

