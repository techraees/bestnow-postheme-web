"use client";

import React, { useState } from "react";
import SubHeader from "@/components/navigation/SubHeader";
import SearchInput from "@/components/search/SearchInput";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { ProductGrid, ProductSkeleton } from "@/components/products";

interface FavoriteProduct {
  id: string;
  title: string;
  image: string;
  rating?: number;
  soldCount?: string;
  price: number;
  isFavorite?: boolean;
}

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
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>(
    sampleFavoriteProducts
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading] = useState(false);

  const filteredProducts = favoriteProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const productCount = filteredProducts.length;
  const totalProductCount = favoriteProducts.length;

  const handleFavoriteClick = (productId: string) => {
    // Remove from favorites when clicked
    setFavoriteProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
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
      <SubHeader
        subtitle={
          searchQuery
            ? `${productCount} found`
            : `${totalProductCount} ${
                totalProductCount === 1 ? "item" : "items"
              }`
        }
        title="Favorites"
      />

      {/* Search Input Section */}
      <div className="w-full flex lg:justify-end justify-baseline  px-4 sm:px-6 lg:px-16 mt-4 md:mt-6">
        <div className="lg:w-[300px] w-full">
          <SearchInput
            initialValue={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
            }}
            placeholder="Search favorites..."
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 md:mt-6 lg:mt-8 pb-8 md:pb-12 lg:pb-16">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="mb-4 md:mb-6">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto text-light_mode_gray_color dark:text-dark_mode_gray_color opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <p className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                {searchQuery ? "No favorites found" : "No Favorites Yet"}
              </p>
              <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                {searchQuery
                  ? `No favorites match "${searchQuery}". Try searching with different keywords.`
                  : "Start adding products to your favorites to see them here."}
              </p>
            </div>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onFavoriteClick={handleFavoriteClick}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </TopSpacingWrapper>
  );
};

export default FavoritesPage;
