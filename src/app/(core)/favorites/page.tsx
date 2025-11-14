"use client";

import React from "react";
import { FavoritesScreen, FavoriteProduct } from "@/components/favorites";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";

// Sample favorites data - in production, this would come from Redux store or API
const sampleFavoriteProducts: FavoriteProduct[] = [
  {
    id: "1",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    rating: 4.5,
    soldCount: "456",
    price: 3570,
    isFavorite: true,
  },
  {
    id: "2",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
    rating: 4.5,
    soldCount: "456",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
    rating: 4.5,
    soldCount: "456",
    price: 3570,
    isFavorite: true,
  },
  {
    id: "4",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/4040/images/PARTS -- BOARD FLEX INFINIX X650 1.webp",
    rating: 4.5,
    soldCount: "456",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "5",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/4267/images/PARTS -- CHARGING FLEX TECNO SPARK 6 GO IC 1.webp",
    rating: 4.5,
    soldCount: "456",
    price: 3570,
    isFavorite: true,
  },
  {
    id: "6",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
    rating: 4.5,
    soldCount: "456",
    price: 13570,
    isFavorite: true,
  },
  {
    id: "7",
    title: "Lcd Screen Samsung A52s 5G",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/7327/images/RF_PARTS_____ON_OFF_FLEX_ONE_PLUS_H_9_R2.webp",
    rating: 4.5,
    soldCount: "456",
    price: 3570,
    isFavorite: true,
  },
  {
    id: "8",
    title: "Lcd Screen Apple iPhone 15 pro max",
    image:
      "https://adminapi.beston.co/uploads/products/6344/images/FORCE_UNIT_____LCD_VIVO_Y27_BLACK1.webp",
    rating: 4.5,
    soldCount: "456",
    price: 13570,
    isFavorite: true,
  },
];

const FavoritesPage = () => {
  const handleFavoriteClick = (productId: string) => {
    console.log("Favorite removed for product:", productId);
    // Handle remove from favorites logic here
    // In production, this would update Redux store or API
  };

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart clicked for product:", productId);
    // Handle add to cart logic here
  };

  return (
    <TopSpacingWrapper>
      <FavoritesScreen
        products={sampleFavoriteProducts}
        onFavoriteClick={handleFavoriteClick}
        onAddToCart={handleAddToCart}
      />
    </TopSpacingWrapper>
  );
};

export default FavoritesPage;
