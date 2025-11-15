"use client";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import React, { useState } from "react";
import { ProductGrid } from "@/components/products";
import SearchInput from "@/components/search/SearchInput";

// Define the product type (duplicated here for completeness, import from the right place in production)
type FavoriteProduct = {
  id: string;
  title: string;
  image: string;
  rating?: number;
  soldCount?: string;
  price: number;
  isFavorite?: boolean;
};

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

const CategorySearchPage = () => {
  // Use state so the UI can update if products are removed (for demo only, remove state management if not needed)
  const [products, setProducts] = useState<FavoriteProduct[]>(
    sampleFavoriteProducts
  );

  const handleFavoriteClick = (productId: string) => {
    // In real app, implement favorite/unfavorite logic here
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    // e.g. update store, call API, etc.
  };

  const handleAddToCart = (productId: string) => {
    // In real app, add to cart logic here
    // e.g. update cart store, call API, etc.
    console.log("Add to cart clicked for product:", productId);
  };

  return (
    <TopSpacingWrapper>
      <SubHeader subtitle="Lcd Screen" title="Category Search" />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-4">
        <SearchInput
          initialValue=""
          onSearchChange={() => {}}
          onFilterClick={() => {}}
          placeholder="Search products..."
        />
      </div>
      <div className="flex-1 overflow-y-auto pb-6 md:pb-8">
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="text-light_mode_text dark:text-dark_mode_text text-center">
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">
                  No Products Yet
                </p>
                <p className="text-sm md:text-base lg:text-lg text-light_mode_gray_color dark:text-dark_mode_gray_color">
                  Start searching and adding products to this category
                </p>
              </div>
            </div>
          ) : (
            <ProductGrid
              products={products}
              onFavoriteClick={handleFavoriteClick}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default CategorySearchPage;
