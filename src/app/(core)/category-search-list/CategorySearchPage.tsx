"use client";

import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ProductGrid, ProductSkeleton } from "@/components/products";
import SearchInput from "@/components/search/SearchInput";
import { useGetAllProductsBasedOnFilterQuery } from "@/redux/api/core/coreApi";

interface Product {
  id?: string;
  product_name?: string;
  images?: string[];
  rating?: number;
  stock_status?: { LABEL?: string };
  productPrice?: number;
  isFavorite?: boolean;
}

export default function CategorySearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [stopCalling, setStopCalling] = useState(false);

  const queryParams: string[] = [];

  if (category) {
    queryParams.push(`entity_type=category`);
    queryParams.push(`entity_value=${encodeURIComponent(category)}`);
  }

  if (searchQuery) {
    queryParams.push(`q=${encodeURIComponent(searchQuery)}`);
  }

  const queryString = queryParams.join("&");

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsBasedOnFilterQuery(
    `page=${page}&limit=20${queryString ? `&${queryString}` : ""}`
  );

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setStopCalling(false);
  }, [category, searchQuery]);

  useEffect(() => {
    if (productsData?.payload?.results) {
      const newProducts = productsData.payload.results;

      setProducts((prev) => {
        const map = new Map<string, Product>();
        prev.forEach((p) => p.id && map.set(p.id, p));
        newProducts.forEach((p: Product) => p.id && map.set(p.id, p));
        return Array.from(map.values());
      });

      if (newProducts.length === 0) setStopCalling(true);
    }
  }, [productsData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight - (scrollTop + windowHeight) < 200) {
        if (!isLoading && !isFetching && !stopCalling) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isFetching, stopCalling]);

  const transformedProducts = products.map((product) => ({
    id: product.id || "",
    title: product.product_name || "",
    image: product.images?.[0] || "",
    rating: product.rating || 4.5,
    soldCount: product.stock_status?.LABEL || "Stock very low",
    price: product.productPrice || 0,
    isFavorite: product.isFavorite || false,
  }));

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    router.push(`/category-search-list?${params.toString()}`);
  };

  const handleSearchSubmit = (query: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    router.push(`/category-search-list?${params.toString()}`);
  };

  const productCount = transformedProducts.length;

  return (
    <TopSpacingWrapper>
      <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color flex flex-col">
        {/* Header Section with Search */}
        <div className="bg-light_mode_color dark:bg-dark_mode_color border-b border-light_mode_color3 dark:border-dark_mode_color3">
          <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 md:py-5 lg:py-6">
              {/* Title Section with Back Button */}
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                <button
                  onClick={() => router.back()}
                  className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 p-1.5 md:p-2 shrink-0"
                  aria-label="Go back"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                </button>
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-wrap">
                  <h1 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-semibold">
                    {category || "All Products"}
                  </h1>
                  {productCount > 0 && (
                    <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                      ({productCount}{" "}
                      {productCount === 1 ? "product" : "products"})
                    </span>
                  )}
                </div>
              </div>

              {/* Search Input - Right Side, Not Full Width */}
              <div className="w-full md:w-auto md:max-w-md lg:max-w-lg">
                <SearchInput
                  initialValue={searchQuery}
                  onSearchChange={handleSearchChange}
                  onSearchSubmit={handleSearchSubmit}
                  placeholder="Search products..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1 overflow-y-auto pb-6 md:pb-8 lg:pb-12">
          <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
            {isLoading && products.length === 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : transformedProducts.length > 0 ? (
              <>
                <ProductGrid products={transformedProducts} />
                {isFetching && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <ProductSkeleton key={`skeleton-${index}`} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
                <div className="text-center max-w-md mx-auto px-4">
                  <div className="mb-4 md:mb-6">
                    <svg
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto text-light_mode_gray_color dark:text-dark_mode_gray_color opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-3">
                    No Products Found
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-light_mode_gray_color dark:text-dark_mode_gray_color">
                    {category
                      ? `No products found in "${category}" category${
                          searchQuery ? ` matching "${searchQuery}"` : ""
                        }.`
                      : searchQuery
                      ? `No products found matching "${searchQuery}".`
                      : "No products available at the moment."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TopSpacingWrapper>
  );
}
