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

  const totalItems = replace.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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
      <SubHeader
        title={`Replace ID (${replace.replaceId})`}
        subtitle={`${totalItems} Items`}
      />
      <div className="min-h-[calc(100vh-230px)] bg-light_mode_color dark:bg-dark_mode_color w-full pb-0 md:pb-0 lg:pb-0 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
          {/* Two Column Layout for Desktop */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-[200px] md:pb-0 lg:pb-0">
            {/* Left Column - Replace Items (Scrollable on Desktop) */}
            <div className="w-full lg:w-2/3 space-y-6 md:space-y-8">
              {/* Replace Information Section */}
              <div className="lg:bg-light_mode_color1 lg:dark:bg-dark_mode_color1 rounded-xl md:rounded-2xl p-0 md:p-6 lg:p-8 space-y-4 md:space-y-5">
                <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                  Replace Information
                </h2>

                {/* Replace Date and Time */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base font-medium">
                      Date & Time:
                    </span>
                    <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                      {replace.date} {replace.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base font-medium">
                      Replace ID:
                    </span>
                    <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-semibold">
                      {replace.replaceId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Replace Items Section */}
              <div className="lg:bg-light_mode_color1 lg:dark:bg-dark_mode_color1 rounded-xl md:rounded-2xl p-0 md:p-6 lg:p-8 space-y-4 md:space-y-5">
                <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                  Replace Items
                </h2>

                {replace.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 md:py-12">
                    <p className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium">
                      No items found
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3 lg:space-y-4">
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
            </div>

            {/* Right Column - Replace Summary (Fixed Bottom on Mobile, Fixed on Desktop) */}
            <div className="w-full lg:w-1/3 lg:hidden">
              {replace.items.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto z-50 md:z-auto">
                  <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-t-2xl md:rounded-xl p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5 shadow-2xl md:shadow-none border-t border-light_mode_color3 dark:border-dark_mode_color3 md:border-t-0">
                    <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                      Replace Summary
                    </h2>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                        <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                          Total:
                        </span>
                        <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                          Rs. {replace.total.toLocaleString("en-PK")}
                        </span>
                      </div>

                      <div className="border-t border-light_mode_color3 dark:border-dark_mode_color3 my-2 md:my-3 pt-3 md:pt-4"></div>

                      <div className="flex justify-between items-center">
                        <span className="text-light_mode_text dark:text-dark_mode_text font-medium text-sm md:text-base">
                          Status:
                        </span>
                        <span
                          className={`text-base md:text-lg font-semibold flex items-center gap-1.5 ${getStatusColor()}`}
                        >
                          {replace.status === "completed" && (
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                          )}
                          {replace.status.charAt(0).toUpperCase() +
                            replace.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Fixed Summary - Outside Container */}
        {replace.items.length > 0 && (
          <div className="hidden lg:block fixed top-[calc(120px+1.5rem)] right-[max(1.5rem,calc((100vw-1600px)/2+1.5rem))] w-[calc((1600px-2rem)*0.333)] max-w-md z-40">
            <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl p-6 lg:p-8 space-y-4 md:space-y-5 shadow-2xl">
              <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                Replace Summary
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                  <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                    Total:
                  </span>
                  <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                    Rs. {replace.total.toLocaleString("en-PK")}
                  </span>
                </div>

                <div className="border-t border-light_mode_color3 dark:border-dark_mode_color3 my-2 md:my-3 pt-3 md:pt-4"></div>

                <div className="flex justify-between items-center">
                  <span className="text-light_mode_text dark:text-dark_mode_text font-medium text-base md:text-lg">
                    Status:
                  </span>
                  <span
                    className={`text-lg font-semibold flex items-center gap-2 ${getStatusColor()}`}
                  >
                    {replace.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    {replace.status.charAt(0).toUpperCase() +
                      replace.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TopSpacingWrapper>
  );
};

export default ReplaceDetailPage;
