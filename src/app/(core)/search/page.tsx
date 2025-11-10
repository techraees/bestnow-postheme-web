"use client";

import React from "react";
import { SearchScreen, SearchProduct } from "@/components/search";

// Sample search products data - in production, this would come from API
const sampleSearchProducts: SearchProduct[] = [
  {
    id: "1",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 3570,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 3570,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/4040/images/PARTS -- BOARD FLEX INFINIX X650 1.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "5",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/4267/images/PARTS -- CHARGING FLEX TECNO SPARK 6 GO IC 1.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 3570,
    isFavorite: false,
  },
  {
    id: "6",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "7",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/7327/images/RF_PARTS_____ON_OFF_FLEX_ONE_PLUS_H_9_R2.webp",
    rating: 4.5,
    soldCount: "Moderate",
    price: 3570,
    isFavorite: false,
  },
  {
    id: "8",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/6344/images/FORCE_UNIT_____LCD_VIVO_Y27_BLACK1.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "9",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/5640/images/FORCE_UNIT____LCD_INFINIX_X666_BLACK1.webp",
    rating: 4.5,
    soldCount: "Very High",
    price: 3570,
    isFavorite: false,
  },
  {
    id: "10",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/7513/images/FALCON_UNIT_____LCD_INFINIX_X688_BLACK1.webp",
    rating: 4.5,
    soldCount: "Very High",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "11",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/9902/images/SNL____GLASS_OCA_SAM_S8_BLACK1.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 3570,
    isFavorite: false,
  },
  {
    id: "12",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/10677/images/JK_UNIT_OLED2____TFT_SAM_J7_BLACK1.webp",
    rating: 4.5,
    soldCount: "Very Low",
    price: 13570,
    isFavorite: true,
  },
];

const SearchPage = () => {
  const handleFavoriteClick = (productId: string) => {
    console.log("Favorite clicked for product:", productId);
  };

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart clicked for product:", productId);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
    // Open filter modal or navigate to filter page
  };

  return (
    <SearchScreen
      initialQuery="Lcd Screen"
      products={sampleSearchProducts}
      onFavoriteClick={handleFavoriteClick}
      onAddToCart={handleAddToCart}
      onFilterClick={handleFilterClick}
    />
  );
};

export default SearchPage;
