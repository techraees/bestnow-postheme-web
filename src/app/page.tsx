"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/header";
import { PromotionalBanner } from "@/components/promotional-banner";
import { CategoriesSection } from "@/components/categories";
import { FilterTabs, FilterTab } from "@/components/filter-tabs";
import { ProductGrid, ProductSkeleton } from "@/components/products";
import useThemeCache from "@/theme/useThemeCache";
import { setIsMenuOpen } from "@/redux/slice/coreSlice";
import { CartIcon, DiscountIcon, QuickOrderIcon, SearchIcon } from "@/assets";
import MenuGrid from "@/components/MenuModal/MenuGrid";
import { BottomNavbar } from "@/components/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import MenuModal from "@/components/MenuModal/MenuModal";
import {
  useGetAllProductsBasedOnFilterQuery,
  useGetAllProductsCategoriesQuery,
  useGetAllProductsBrandsNamesQuery,
} from "@/redux/api/core/coreApi";
import { ALLOWED_QUERY_PARAMS_PRODUCTS_HOME_PAGE } from "@/data/coreData/coreEnums/coreGeneralEnums";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";

interface Product {
  id?: string;
  product_name?: string;
  images?: string[];
  rating?: number;
  stock_status?: { LABEL?: string };
  productPrice?: number;
  isFavorite?: boolean;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  // Redux state
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const { toggleTheme } = useThemeCache();
  const isMenuOpen = useSelector((state: any) => state.coreAppSlice.isMenuOpen);

  // Local state
  const [activeTab, setActiveTab] = useState<FilterTab>("popular");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [stopCalling, setStopCalling] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handlers
  const handleMenuClick = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
  };

  const handleCategoryClick = (category: any) => {
    console.log("Category clicked:", category);
  };

  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleFavoriteClick = (productId: string) => {
    console.log("Favorite clicked for product:", productId);
  };

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart clicked for product:", productId);
  };

  // Read filters from URL params
  useEffect(() => {
    const filtersObj: Record<string, string> = {};
    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (ALLOWED_QUERY_PARAMS_PRODUCTS_HOME_PAGE.includes(key)) {
          filtersObj[key] = value;
        }
      });
    }
    setFilters(filtersObj);
    setProducts([]);
    setPage(1);
    setStopCalling(false);
  }, [searchParams]);

  // Build query string from filters
  const queryString = Object.keys(filters)
    .map((key) => `${key}=${filters[key]}`)
    .join("&");

  // API call - fetch products
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsBasedOnFilterQuery(
    `page=${page}&limit=20${queryString ? `&${queryString}` : ""}`
  );

  // Merge new products with existing ones
  useEffect(() => {
    if (productsData?.payload?.results) {
      const newProducts = productsData.payload.results;
      setProducts((prev) => {
        // Create unique products by id
        const productMap = new Map<string, Product>();
        prev.forEach((p) => {
          if (p.id) productMap.set(p.id, p);
        });
        newProducts.forEach((p: Product) => {
          if (p.id) productMap.set(p.id, p);
        });
        return Array.from(productMap.values());
      });

      // Stop calling if no more products
      if (newProducts.length === 0) {
        setStopCalling(true);
      }
    }
  }, [productsData]);

  // Infinite scroll - load more when user scrolls to bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is near bottom (within 200px)
      if (documentHeight - (scrollTop + windowHeight) < 200) {
        if (!isLoading && !isFetching && !stopCalling) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isFetching, stopCalling]);

  // Transform API products to component format
  const transformedProducts = products.map((product) => ({
    id: product.id || "",
    title: product.product_name || "",
    image: product.images?.[0] ? getImgBaseUrl(product.images[0]) : "",
    rating: product.rating || 4.5,
    soldCount: product.stock_status?.LABEL || "Stock very low",
    price: product.productPrice || 0,
    isFavorite: product.isFavorite || false,
  }));

  // Menu data
  const menuData = [
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <SearchIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Search",
      onClick: () => router.push("/search"),
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <CartIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "My Cart",
      onClick: () => router.push("/cart"),
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <QuickOrderIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Quick Order",
      onClick: () => console.log("Quick Order clicked"),
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <DiscountIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Discount & Offers",
      onClick: () => console.log("Discount & Offers clicked"),
      badge: "10+",
    },
  ];

  return (
    <TopSpacingWrapper>
      <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full overflow-x-hidden">
        {/* Header */}
        <div className="w-full max-w-[1600px] mx-auto bg-light_mode_color dark:bg-dark_mode_color">
          <AppHeader
            theme_mode={mounted ? theme_mode : "light"}
            onMenuClick={handleMenuClick}
            onThemeToggle={toggleTheme}
          />
        </div>
        {isMenuOpen && <MenuModal />}

        {/* Promotional Banner */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <PromotionalBanner />
        </div>

        {/* Main Content */}
        <div className="w-full max-w-[1600px] mx-auto bg-light_mode_color dark:bg-dark_mode_color min-h-screen">
          <main className="pb-8 md:pb-12 lg:pb-16">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
              {/* Action Buttons Grid */}
              <div className="mb-6 md:mb-8 lg:mb-10 lg:hidden block">
                <MenuGrid data={menuData} />
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
                {isLoading && products.length === 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))}
                  </div>
                ) : transformedProducts.length > 0 ? (
                  <>
                    <ProductGrid
                      products={transformedProducts}
                      onFavoriteClick={handleFavoriteClick}
                      onAddToCart={handleAddToCart}
                    />
                    {isFetching && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <ProductSkeleton key={`skeleton-${index}`} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-light_mode_text dark:text-dark_mode_text text-lg">
                      No products found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        <BottomNavbar cartCount={10} />
      </div>
    </TopSpacingWrapper>
  );
}
