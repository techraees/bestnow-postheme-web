"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppHeader } from "@/components/header";
import { PromotionalBanner } from "@/components/promotional-banner";
import { ActionButtonsGrid } from "@/components/action-buttons";
import { CategoriesSection } from "@/components/categories";
import { FilterTabs, FilterTab } from "@/components/filter-tabs";
import { ProductGrid } from "@/components/products";
import { BannerImage, BannerImage1 } from "@/assets/images";
import useThemeCache from "@/theme/useThemeCache";

export default function Home() {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const { toggleTheme } = useThemeCache();
  const [activeTab, setActiveTab] = useState<FilterTab>("popular");

  const handleMenuClick = () => {
    // Handle menu click
    console.log("Menu clicked");
  };

  const handleSearchClick = () => {
    // Handle search click
    console.log("Search clicked");
  };

  const handleBillingClick = () => {
    // Handle billing click
    console.log("Billing clicked");
  };

  const handleCartClick = () => {
    // Handle cart click
    console.log("Cart clicked");
  };

  const handleOffersClick = () => {
    // Handle offers click
    console.log("Offers clicked");
  };

  const handleCategoryClick = (category: any) => {
    // Handle category click
    console.log("Category clicked:", category);
  };

  const handleSeeAllClick = () => {
    // Handle see all click
    console.log("See all clicked");
  };

  const handleFilterClick = () => {
    // Handle filter click
    console.log("Filter clicked");
  };

  const handleFavoriteClick = (productId: string) => {
    // Handle favorite click
    console.log("Favorite clicked for product:", productId);
  };

  const handleAddToCart = (productId: string) => {
    // Handle add to cart
    console.log("Add to cart clicked for product:", productId);
  };

  // Sample products data
  const sampleProducts = [
    {
      id: "1",
      title: "Lcd Screen Samsung A52s 5G",
      image: BannerImage,
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "2",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image: BannerImage1,
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "3",
      title: "Lcd Screen Samsung A52s 5G",
      image: BannerImage,
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "4",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image: BannerImage1,
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "5",
      title: "Lcd Screen Samsung A52s 5G",
      image: BannerImage,
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "6",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image: BannerImage1,
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "7",
      title: "Lcd Screen Samsung A52s 5G",
      image: BannerImage,
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "8",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image: BannerImage1,
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
  ];

  return (
    <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full overflow-x-hidden">
      {/* Mobile-first design - perfect on mobile (100% same), adaptable on web */}
      <div className="w-full max-w-full md:max-w-2xl lg:max-w-4xl md:mx-auto bg-light_mode_color dark:bg-dark_mode_color min-h-screen">
        {/* Header */}
        <AppHeader
          theme_mode={theme_mode}
          onMenuClick={handleMenuClick}
          onThemeToggle={toggleTheme}
        />

        {/* Main Content */}
        <main className="pb-20">
          {/* Promotional Banner */}
          <PromotionalBanner />

          {/* Action Buttons Grid */}
          <ActionButtonsGrid
            cartCount={10}
            offersCount={6}
            onSearchClick={handleSearchClick}
            onBillingClick={handleBillingClick}
            onCartClick={handleCartClick}
            onOffersClick={handleOffersClick}
          />

          {/* Categories Section */}
          <CategoriesSection
            onCategoryClick={handleCategoryClick}
            onSeeAllClick={handleSeeAllClick}
          />

          {/* Filter Tabs */}
          <FilterTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onFilterClick={handleFilterClick}
          />

          {/* Products Grid */}
          <ProductGrid
            products={sampleProducts}
            onFavoriteClick={handleFavoriteClick}
            onAddToCart={handleAddToCart}
          />
        </main>
      </div>
    </div>
  );
}
