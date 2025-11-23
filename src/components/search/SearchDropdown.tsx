"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiShoppingCart } from "react-icons/hi";
import {
  useAddToCartMutation,
  useGetCartItemsIdsQuery,
} from "@/redux/api/core/cartApi";
import { toast } from "react-toastify";
import { BannerImage } from "@/assets";

interface Product {
  id: number;
  product_name: string;
  image: string;
  productPrice: number;
  stock_status: {
    LABEL: string;
    COLOR: string;
  };
}

interface SearchDropdownProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  products,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const { data: cartItemsIds, refetch: refetchCartItemsIds } =
    useGetCartItemsIdsQuery();

  // Initialize quantities
  useEffect(() => {
    const initialQuantities: Record<number, number> = {};
    products.forEach((product) => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantities((prev) => ({
      ...prev,
      [productId]: validQuantity,
    }));
  };

  const handleIncrease = (productId: number) => {
    const currentQty = quantities[productId] || 1;
    handleQuantityChange(productId, currentQty + 1);
  };

  const handleDecrease = (productId: number) => {
    const currentQty = quantities[productId] || 1;
    if (currentQty > 1) {
      handleQuantityChange(productId, currentQty - 1);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = value === "" ? 1 : parseInt(value, 10);
      handleQuantityChange(productId, numValue);
    }
  };

  const handleAddToCart = async (
    e: React.MouseEvent,
    productId: number,
    quantity: number
  ) => {
    e.stopPropagation();
    try {
      await addToCart({
        productId: productId.toString(),
        quantity: quantity,
      }).unwrap();
      refetchCartItemsIds();
      toast.success("Added to cart");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
    onClose();
  };

  if (!isOpen || products.length === 0) return null;

  // Get stock status color
  const getStockStatusColor = (label: string) => {
    const lower = label?.toLowerCase() || "";
    if (lower === "stock high") {
      return "text-light_mode_green_color dark:text-dark_mode_green_color";
    } else if (lower === "stock low") {
      return "text-orange-500 dark:text-dark_mode_orange_color";
    } else if (lower === "stock very low") {
      return "text-light_mode_red_color dark:text-dark_mode_red_color";
    } else if (lower === "coming soon") {
      return "text-light_mode_cyan_color dark:text-dark_mode_cyan_color";
    }
    return "text-light_mode_gray_color dark:text-dark_mode_gray_color";
  };


  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-light_mode_color dark:bg-dark_mode_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl shadow-xl z-50 max-h-[500px] overflow-y-auto scrollbar_hide_custom"
    >
      <div className="p-3 space-y-3">
        {products.slice(0, 5).map((product) => {
          const quantity = quantities[product.id] || 1;
          const isInCart = cartItemsIds?.payload?.includes(
            product.id.toString()
          );

          return (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="group relative bg-light_mode_color dark:bg-dark_mode_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl p-3 md:p-4 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98] border border-transparent hover:border-light_mode_color3 dark:hover:border-dark_mode_color3"
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 bg-white rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={product.image}
                    alt={product.product_name}
                    fill
                    className="object-contain p-1.5"
                    sizes="(max-width: 768px) 80px, 96px"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                  {/* Top Section: Name and Stock */}
                  <div className="space-y-1">
                    <h3 className="text-light_mode_text truncate dark:text-dark_mode_text text-sm md:text-base font-medium line-clamp-2 leading-tight opacity-85">
                      {product.product_name}
                    </h3>
                    {product.stock_status && (
                      <span
                        className={`text-xs font-medium ${getStockStatusColor(
                          product.stock_status.LABEL
                        )}`}
                      >
                        {product.stock_status.LABEL}
                      </span>
                    )}
                  </div>

                  {/* Bottom Section: Price, Quantity, and Cart Button */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Price */}
                    <p className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-normal">
                      Rs. {product.productPrice.toLocaleString("en-PK")}
                    </p>

                    {/* Quantity Controls and Cart Button */}
                    <div className="flex items-center gap-2">
                      {!isInCart && (
                        <div className="flex items-center text-light_mode_blue_color dark:text-dark_mode_blue_color gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(product.id);
                            }}
                            disabled={quantity <= 1}
                            className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[25px] w-[25px] flex justify-center items-center text-dark_mode_color dark:text-light_mode_color hover:opacity-80 active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                          >
                            <ChevronDown size={18} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => handleInputChange(e, product.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="min-w-[24px] max-w-[40px] text-center bg-transparent border-none outline-none text-light_mode_text dark:text-dark_mode_text text-sm font-medium focus:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrease(product.id);
                            }}
                            className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[25px] w-[25px] flex justify-center items-center text-light_mode_yellow_color dark:text-dark_mode_yellow_color hover:opacity-80 active:opacity-60 transition-opacity"
                          >
                            <ChevronUp size={18} />
                          </button>
                        </div>
                      )}

                      {/* Cart Button */}
                      {isInCart ? (
                        <button
                          onClick={(e) => e.stopPropagation()}
                          disabled
                          className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px] flex items-center justify-center opacity-60 cursor-not-allowed"
                        >
                          <HiShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-light_mode_text dark:text-dark_mode_text" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) =>
                            handleAddToCart(e, product.id, quantity)
                          }
                          disabled={isAdding}
                          className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px] flex items-center justify-center hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <HiShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchDropdown;
