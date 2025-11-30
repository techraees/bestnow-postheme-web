"use client";

import {
  useAddToCartMutation,
  useGetCartItemsIdsQuery
} from "@/redux/api/core/cartApi";
import { RootState } from "@/redux/store/store";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart, HiStar } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FullImageModal from "../modal/FullImageModal";

interface ProductCardProps {
  id: string;
  title: string;
  image: any;
  rating?: number;
  soldCount?: string;
  price: number;
  min_qty?: number;
  isFavorite?: boolean;
  onFavoriteClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  rating = 4.5,
  soldCount = "Stock very low",
  price,
  min_qty,
  isFavorite = false,
  onFavoriteClick,
  onAddToCart,
}) => {
  const { user_profile } = useSelector(
    (state: RootState) => state.coreAppSlice
  );
  const router = useRouter();

  const [favorite, setFavorite] = useState(isFavorite);
  const [quantity, setQuantity] = useState(min_qty || 1);
  const [currentImage, setCurrentImage] = useState<null | string>(null);


  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const { data: cartItemsIds, refetch: refetchCartItemsIds } =
    useGetCartItemsIdsQuery();

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    onFavoriteClick?.(id);
  };

  const handleAddToCart = async () => {
    try {
      if (!user_profile?.id) {
        router.push("/login");
        return;
      }

      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      await addToCart({ productId: id, quantity: newQuantity }).unwrap();
      refetchCartItemsIds();
      // toast.success("Added to cart");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  // Format price with Rs. prefix
  const formattedPrice = `Rs. ${price.toLocaleString("en-PK")}`;

  const minQty = min_qty ?? 1;

  // draft = raw typable string
  const [draftQty, setDraftQty] = useState(String(minQty));

  // Sync when min changes
  useEffect(() => {
    setDraftQty(String(Math.max(quantity ?? minQty, minQty)));
  }, [minQty]);

  // Parse
  const parseDraft = () => {
    const n = parseInt(draftQty, 10);
    return Number.isFinite(n) ? n : NaN;
  };

  // Clamp + commit
  const commitClamp = () => {
    const n = parseDraft();
    const clamped = Number.isFinite(n)
      ? Math.min(Math.max(n, minQty), 100000000)
      : minQty;

    setQuantity(clamped);
    setDraftQty(String(clamped));
  };

  // Increment
  const handleIncrease = () => {
    const n = parseDraft();
    const base = Number.isFinite(n) ? n : minQty;

    if (base < 100000000) {
      const next = base + 1;
      setQuantity(next);
      setDraftQty(String(next));
    }
  };

  // Decrement
  const handleDecrease = () => {
    const n = parseDraft();
    const base = Number.isFinite(n) ? n : minQty;
    const next = Math.max(base - 1, minQty);

    setQuantity(next);
    setDraftQty(String(next));
  };

  // Raw change (digits allowed)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^\d]/g, "");
    setDraftQty(clean);
  };

  // On blur → clamp
  const handleInputBlur = () => {
    commitClamp();
  };

  // On Enter → clamp
  const handleQtyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitClamp();
  };


  return (
    <>
      <div className="relative w-full bg-light_mode_color dark:bg-dark_mode_color rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] duration-200">
        {/* Product Image Area - White Background with rounded corners (60-65% height) */}
        <div
          onClick={() => {
            setCurrentImage(image);
          }}
          className="block"
        >
          <div className="relative border bg-white rounded-2xl mt-2 mb-3 h-[180px] md:h-[200px] lg:h-[220px] flex items-center justify-center cursor-pointer">
            {/* Favorite Icon - Light gray circular button with black outline heart */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFavoriteClick();
              }}
              className="absolute top-2 right-2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-300 dark:bg-gray-400 flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {favorite ? (
                <HiHeart className="h-4 w-4 md:h-5 md:w-5 text-dark_mode_color fill-current" />
              ) : (
                <HiOutlineHeart className="h-4 w-4 md:h-5 md:w-5 text-dark_mode_color dark:text-light_mode_text stroke-[2.5]" />
              )}
            </button>

            {/* Product Image */}
            <div className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src={getImgBaseUrl(image)}
                alt={title}
                width={190}
                height={190}
                className="object-fill h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Product Details Area */}
        <div className="bg-light_mode_color dark:bg-dark_mode_color pb-1 space-y-0.5 px-2 md:px-3">
          {/* Product Title */}
          <Link href={`/products/${id}`} className="block">
            <h3 className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium line-clamp-2 min-h-[38px] md:min-h-[44px] leading-tight cursor-pointer hover:opacity-80 transition-opacity">
              {title}
            </h3>
          </Link>
          {/* Rating and Sold Count */}
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <HiStar className="h-4 w-4 md:h-5 md:w-5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color fill-current" />
              <span className="text-light_mode_text dark:text-dark_mode_text">
                {rating}/5
              </span>
            </div>
            {(() => {
              let colorClass =
                "text-light_mode_gray_color dark:text-dark_mode_gray_color";
              if (soldCount) {
                const lower = soldCount;
                if (lower === "Stock High") {
                  colorClass =
                    "text-light_mode_green_color dark:text-dark_mode_green_color";
                } else if (lower == "Stock Low") {
                  colorClass =
                    "text-orange-500 dark:text-dark_mode_orange_color";
                } else if (lower == "Stock very low") {
                  colorClass =
                    "text-light_mode_red_color dark:text-dark_mode_red_color";
                } else if (lower == "Coming Soon") {
                  colorClass =
                    "text-light_mode_cyan_color dark:text-dark_mode_cyan_color";
                }
              }
              return <span className={colorClass}>{soldCount}</span>;
            })()}
          </div>
          {/* Price and Quantity Controls */}
          <div className="pt-1 flex items-center justify-between ">
            <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-base md:text-lg lg:text-xl font-bold">
              {formattedPrice}
            </span>
            {!cartItemsIds?.payload.includes(id) && (
              <div className="flex items-center text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm gap-0 md:gap-3">
                <button
                  onClick={handleDecrease}
                  disabled={parseDraft() <= minQty}

                  className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[25px] w-[25px] flex justify-center items-center text-dark_mode_color dark:text-light_mode_color hover:opacity-80 active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <ChevronDown size={20} />
                </button>
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={draftQty}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleQtyKeyDown}
                  disabled={isAdding}
                  className="min-w-[24px] max-w-[40px] text-center bg-transparent border-none outline-none text-light_mode_text dark:text-dark_mode_text text-sm font-medium focus:ring-0 p-0 disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={handleIncrease}
                  disabled={isAdding}
                  className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[25px] w-[25px] flex justify-center items-center text-light_mode_yellow_color dark:text-dark_mode_yellow_color hover:opacity-80 active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <ChevronUp size={20} />
                </button>
              </div>
            )}
          </div>
          {/* Add to Cart Button - Dark gray rounded rectangle */}
          {cartItemsIds?.payload.includes(id) ? (
            <button className=" w-full mt-1 md:mt-2 bg-light_mode_color2 dark:bg-dark_mode_color2 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text py-2.5 md:py-3 rounded-2xl font-medium text-xs md:text-sm  opacity-80 cursor-not-allowed">
              Already inside cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full mt-1 md:mt-2 bg-light_mode_color2 dark:bg-dark_mode_yellow_highlight_color hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text py-2.5 md:py-3 rounded-2xl font-medium text-xs md:text-sm transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
      <FullImageModal
        isOpen={currentImage ? true : false}
        onClose={() => setCurrentImage("")}
        imageUrl={image || ""}
      />
    </>
  );
};

export default ProductCard;
