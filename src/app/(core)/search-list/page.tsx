"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchScreen, SearchProduct } from "@/components/search";
import { Pagination } from "@/components/pagination";
import { ProductSkeleton } from "@/components/products";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { useGetSearchResultsQuery } from "@/redux/api/core/searchApi";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const limit = 20;

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  // Fetch search results from API
  const {
    data: searchResultsData,
    isLoading,
    isFetching,
  } = useGetSearchResultsQuery(
    {
      q: query,
      page,
      limit,
    },
    { skip: !query } // Skip query if no search term
  );

  console.log(searchResultsData);

  // Transform API response to SearchProduct format
  // Handle both array response and object with results
  const payload = searchResultsData?.payload;
  const productsArray = Array.isArray(payload)
    ? payload
    : payload?.results || [];

  const products: SearchProduct[] = productsArray.map((product: any) => ({
    id: product.id || product.product_id || "",
    title: product.product_name || product.name || "",
    image: product.images?.[0] ? getImgBaseUrl(product.images[0]) : "",
    rating: product.rating || 4.5,
    soldCount: product.stock_status?.LABEL || "Stock very low",
    price: product.productPrice || product.price || 0,
    isFavorite: product.isFavorite || false,
  }));

  // Get pagination info (might be in payload object or calculate from products)
  const totalPages = Array.isArray(payload)
    ? Math.ceil(products.length / limit) || 1
    : payload?.totalPages || 1;
  const currentPage = Array.isArray(payload)
    ? page
    : payload?.currentPage || page;
  const totalResults = Array.isArray(payload)
    ? products.length
    : payload?.totalResults || 0;

  const handleFavoriteClick = (productId: string) => {
    console.log("Favorite clicked for product:", productId);
    // TODO: Implement favorite toggle API call
  };

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart clicked for product:", productId);
    // TODO: Implement add to cart API call
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
    // TODO: Open filter modal or navigate to filter page
  };

  const handleSearchSubmit = (newQuery: string) => {
    // Update URL with new query param
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery.trim()) {
      params.set("q", newQuery.trim());
    } else {
      params.delete("q");
    }
    router.push(`/search-list?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TopSpacingWrapper>
      <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
        {query ? (
          <>
            {isLoading && products.length === 0 ? (
              // Show loading skeleton on initial load
              <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
                <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                    {Array.from({ length: limit }).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <SearchScreen
                  initialQuery={query}
                  products={products}
                  onFavoriteClick={handleFavoriteClick}
                  onAddToCart={handleAddToCart}
                  onFilterClick={handleFilterClick}
                  onSearchSubmit={handleSearchSubmit}
                />
                {/* Loading Skeleton while fetching next page */}
                {isFetching && products.length > 0 && (
                  <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <ProductSkeleton key={`skeleton-${index}`} />
                      ))}
                    </div>
                  </div>
                )}
                {/* Pagination */}
                {!isLoading &&
                  !isFetching &&
                  products.length > 0 &&
                  totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
              </>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center py-16 md:py-20 lg:py-24">
            <div className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 text-light_mode_text dark:text-dark_mode_text">
                No search query
              </p>
              <p className="text-sm md:text-base lg:text-lg text-light_mode_gray_color dark:text-dark_mode_gray_color">
                Please enter a search term to find products
              </p>
            </div>
          </div>
        )}
      </div>
    </TopSpacingWrapper>
  );
};

export default SearchPage;
