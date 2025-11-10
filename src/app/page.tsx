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
import { setIsMenuOpen } from "@/redux/slice/coreSlice";
import { useDispatch } from "react-redux";
import MenuModal from "@/components/MenuModal/MenuModal";

export default function Home() {
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
      image:
        "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "2",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image:
        "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "3",
      title: "Lcd Screen Samsung A52s 5G",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "4",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image:
        "https://adminapi.beston.co/uploads/products/4040/images/PARTS -- BOARD FLEX INFINIX X650 1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "5",
      title: "Lcd Screen Samsung A52s 5G",
      image:
        "https://adminapi.beston.co/uploads/products/4267/images/PARTS -- CHARGING FLEX TECNO SPARK 6 GO IC 1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "6",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "7",
      title: "Lcd Screen Samsung A52s 5G",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/7327/images/RF_PARTS_____ON_OFF_FLEX_ONE_PLUS_H_9_R2.webp",
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "8",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image:
        "https://adminapi.beston.co/uploads/products/6344/images/FORCE_UNIT_____LCD_VIVO_Y27_BLACK1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "9",
      title: "Lcd Screen Samsung A52s 5G",
      image:
        "https://adminapi.beston.co/uploads/products/5640/images/FORCE_UNIT____LCD_INFINIX_X666_BLACK1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "10",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image:
        "https://adminapi.beston.co/uploads/products/7513/images/FALCON_UNIT_____LCD_INFINIX_X688_BLACK1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
    {
      id: "11",
      title: "Lcd Screen Samsung A52s 5G",
      image:
        "https://adminapi.beston.co/uploads/products/9902/images/SNL____GLASS_OCA_SAM_S8_BLACK1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 3570,
      isFavorite: false,
    },
    {
      id: "12",
      title: "Lcd Screen Apple iPhone 15 pro max",
      image:
        "https://adminapi.beston.co/uploads/products/10677/images/JK_UNIT_OLED2____TFT_SAM_J7_BLACK1.webp",
      rating: 4.5,
      soldCount: 456,
      price: 13570,
      isFavorite: true,
    },
  ];

  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const { toggleTheme } = useThemeCache();
  const isMenuOpen = useSelector((state: any) => state.coreAppSlice.isMenuOpen);
  const dispatch = useDispatch();
  const handleMenuClick = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
    console.log("isMenuOpen", isMenuOpen);
  };
  const [activeTab, setActiveTab] = useState<FilterTab>("popular");

  return (
    <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full overflow-x-hidden">
      {/* Header */}
      <div className="w-full max-w-[1600px] mx-auto bg-light_mode_color dark:bg-dark_mode_color">
        <AppHeader
          theme_mode={theme_mode}
          onMenuClick={handleMenuClick}
          onThemeToggle={toggleTheme}
        />
      </div>
      {isMenuOpen && <MenuModal />}
      {/* Promotional Banner - Full width on desktop, padded on mobile */}
      <div className="mb-6 md:mb-8 lg:mb-10">
        <PromotionalBanner />
      </div>

      {/* Responsive Container - Mobile perfect, Desktop professional */}
      <div className="w-full max-w-[1600px] mx-auto bg-light_mode_color dark:bg-dark_mode_color min-h-screen">
        {/* Main Content Container */}
        <main className="pb-8 md:pb-12 lg:pb-16">
          {/* Content Wrapper - Responsive padding and max-width */}
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Action Buttons Grid */}
            <div className="mb-6 md:mb-8 lg:mb-10 lg:hidden block">
              <ActionButtonsGrid
                cartCount={10}
                offersCount={6}
                onSearchClick={handleSearchClick}
                onBillingClick={handleBillingClick}
                onCartClick={handleCartClick}
                onOffersClick={handleOffersClick}
              />
            </div>

            {/* Categories Section */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <CategoriesSection
                onCategoryClick={handleCategoryClick}
                onSeeAllClick={handleSeeAllClick}
              />
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <FilterTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onFilterClick={handleFilterClick}
              />
            </div>

            {/* Products Grid */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <ProductGrid
                products={sampleProducts}
                onFavoriteClick={handleFavoriteClick}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
