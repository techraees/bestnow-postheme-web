"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Star,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { ProductImageCarousel } from "@/components/product-detail";
import { ArrowDescrptionIcon, CartIcon } from "@/assets";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const product = {
  id: "1",
  name: "Lcd Screen Samsung A52s 5G golden crown Brand",
  images: [
    "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
    "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
    "https://adminapi.beston.co/uploads/products/4040/images/PARTS -- BOARD FLEX INFINIX X650 1.webp",
  ],
  price: 34500,
  rating: 4.5,
  reviewCount: 459,
  soldCount: 456,
  warranty: "2 Year Warranty",
  description: "High quality LCD screen replacement for Samsung A52s 5G",
};

export default function ProductPage() {
  const [favorite, setFavorite] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => router.back(), 320); // animation ke baad navigate
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-light_mode_color dark:bg-dark_mode_color text-white flex flex-col items-center font-[Outfit] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key="product-detail"
            initial={{ x: "0%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="w-full"
          >
            {/* top back & fav */}
            <div className="relative w-full bg-light_mode_color dark:bg-dark_mode_color overflow-hidden">
              {/* back (slide-out on click) */}
              <button
                onClick={handleBack}
                className="absolute z-30 text-light_mode_color dark:text-dark_mode_color left-3 top-3 bg-dark_mode_color2 dark:bg-light_mode_color2 p-2 rounded-full"
                aria-label="Go back"
              >
                <ChevronLeft size={22} />
              </button>

              {/* fav */}
              <button
                onClick={() => setFavorite(!favorite)}
                className="absolute z-30 right-3 top-3 bg-dark_mode_color2 dark:bg-light_mode_color2 p-2 rounded-full"
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`${
                    favorite
                      ? "text-light_mode_color dark:text-dark_mode_color fill-light_mode_color dark:fill-dark_mode_color"
                      : "text-light_mode_color dark:text-dark_mode_color"
                  }`}
                  size={22}
                />
              </button>

              <ProductImageCarousel
                banners={product.images.map((item, i) => ({
                  id: i,
                  image: item,
                }))}
              />
            </div>

            <div className="w-full px-4 mt-4 space-y-2">
              {/* Price and name */}
              <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 p-3 rounded-[15px]">
                <h2 className="text-[22px] text-dark_mode_color3 dark:text-light_mode_color3 font-semibold">
                  Rs.{product.price.toLocaleString()}
                </h2>
                <p className="text-[18px] leading-5.5 text-dark_mode_color3 dark:text-light_mode_color3 mt-1">
                  {product.name}
                </p>
              </div>

              {/* Rating and sold */}
              <div className="flex gap-1 w-full items-center justify-between mt-3">
                <div className="w-[50%] h-[48px] bg-light_mode_color2 dark:bg-dark_mode_color2 text-[16px] font-medium p-2.5 rounded-full flex justify-center items-center gap-1">
                  <Star size={16} className="text-[#FFD53F] fill-[#FFD53F]" />
                  <span className="text-[13px] text-dark_mode_color3 dark:text-light_mode_color3">
                    {product.rating}/5 ({product.reviewCount})
                  </span>
                </div>
                <span className="w-[50%] h-[48px] bg-light_mode_color2 dark:bg-dark_mode_color2 text-dark_mode_color dark:text-light_mode_color text-[16px] font-[300] p-2.5 rounded-full flex justify-center items-center">
                  {product.soldCount} Sold
                </span>
              </div>

              {/* Buttons Row 1 */}
              <div className="flex w-full gap-1">
                <button className="w-[50%] h-[48px] bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_blue_color text-[16px] font-medium p-2.5 rounded-full flex justify-center items-center">
                  {product.warranty}
                </button>
                <button className="w-[50%] h-[48px] bg-light_mode_color2 dark:bg-dark_mode_color2 text-dark_mode_color dark:text-light_mode_color text-[15px] font-[300] py-2.5 px-5 rounded-full flex justify-between items-center">
                  Description
                  <ArrowDescrptionIcon className="w-2.5 h-2.5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
                </button>
              </div>

              {/* Buttons Row 2 */}
              <div className="flex w-full gap-1">
                <button className="w-[50%] h-[48px] bg-light_mode_color2 dark:bg-dark_mode_color2 text-dark_mode_color dark:text-light_mode_color text-[15px] font-[300] py-2.5 px-5 rounded-full flex justify-between items-center">
                  Rating & Reviews
                  <ArrowDescrptionIcon className="w-2.5 h-2.5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
                </button>
                <button className="w-[50%] h-[48px] text-light_mode_blue_color dark:text-dark_mode_blue_color text-[20px] font-medium rounded-full flex justify-between items-center">
                  <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[48px] w-[65px] flex justify-center items-center text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                    <ChevronDown size={20} />
                  </div>
                  10
                  <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[48px] w-[65px] flex justify-center items-center text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                    <ChevronUp size={20} />
                  </div>
                </button>
              </div>
            </div>

            {/* bottom bar */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 h-[100px] w-full bg-light_mode_color dark:bg-dark_mode_color flex items-center justify-between gap-x-2 px-4 py-3">
              <div className="flex w-[50%] h-[60px] flex-col justify-center items-center bg-light_mode_color2 dark:bg-dark_mode_color2 text-black font-semibold rounded-full transition">
                <div>
                  <p className="text-[10px] font-[300] text-left text-gray-400">
                    Total
                  </p>
                  <h3 className="text-dark_mode_blue_color font-semibold text-lg">
                    Rs. {product.price.toLocaleString()}
                  </h3>
                </div>
              </div>
              <button className="flex w-[50%] h-[60px] justify-center items-center gap-2 bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black font-[400] px-5 py-3 rounded-full transition">
                <CartIcon className="w-4.5 h-4.5 text-light_mode_color dark:text-dark_mode_color" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}

        {/* overlay while exiting */}
        {isExiting && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="absolute inset-0 bg-black"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
