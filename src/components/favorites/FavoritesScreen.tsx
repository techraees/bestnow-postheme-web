"use client";

import React, { useState } from "react";
import FavoritesHeader from "../navigation/SubHeader";
import { ProductGrid } from "@/components/products";

export interface FavoriteProduct {
  id: string;
  title: string;
  image: any;
  rating?: number;
  soldCount?: string;
  price: number;
  isFavorite?: boolean;
}

interface FavoritesScreenProps {
  products?: FavoriteProduct[];
  onFavoriteClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  title?: string;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  products = [],
  onFavoriteClick,
  onAddToCart,
  title = "Favorites",
}) => {
  const [favoriteProducts, setFavoriteProducts] =
    useState<FavoriteProduct[]>(products);

  const handleFavoriteClick = (id: string) => {
    // Remove from favorites when clicked
    setFavoriteProducts((prev) => prev.filter((product) => product.id !== id));
    onFavoriteClick?.(id);
  };

  const handleAddToCart = (id: string) => {
    onAddToCart?.(id);
  };

  const itemCount = favoriteProducts.length;

  return (
    <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
      {/* Header */}
      <FavoritesHeader itemCount={itemCount} title={title} />

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto pb-6 md:pb-8">
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="text-light_mode_text dark:text-dark_mode_text text-center">
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">
                  No Favorites Yet
                </p>
                <p className="text-sm md:text-base lg:text-lg text-light_mode_gray_color dark:text-dark_mode_gray_color">
                  Start adding products to your favorites
                </p>
              </div>
            </div>
          ) : (
            <ProductGrid
              products={favoriteProducts}
              onFavoriteClick={handleFavoriteClick}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesScreen;
