"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Star,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import {
  ProductImageCarousel,
  RatingDrawer,
  ReviewsDrawer,
} from "@/components/product-detail";
import { ArrowDescrptionIcon, CartIcon } from "@/assets";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const product = {
  id: "1",
  name: "Lcd Screen Samsung A52s 5G golden crown Brand",
  images: [
    "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
    "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
    "https://adminapi.beston.co/uploads/products/4040/images/PARTS -- BOARD FLEX INFINIX X650 1.webp",
  ],
  price: 34500,
  rating: 4.5,
  reviewCount: 459,
  soldCount: 456,
  warranty: "2 Year Warranty",
  description: "High quality LCD screen replacement for Samsung A52s 5G",
};

const sampleReviews = [
  {
    id: "1",
    userName: "Finn Carver",
    userLocation: "Lahore, Pakistan",
    userAvatar: "",
    rating: 4,
    date: "24, Jan 2025",
    time: "03:42 PM",
    reviewText:
      "I recently replaced the LCD screen of my Vivo Y20, and I'm quite impressed with the overall performance. The display is bright and clear, with vibrant colors. The touch sensitivity is excellent, and it feels just like the original screen. Installation was fairly easy, and it fits perfectly. My only downside is that it took a bit longer to receive the part than expected, but once it was installed, everything worked great. Highly recommend for anyone needing a reliable replacement!",
    images: [
      "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
      "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
      "https://adminapi.beston.co/uploads/products/4040/images/PARTS -- BOARD FLEX INFINIX X650 1.webp",
    ],
  },
  {
    id: "2",
    userName: "Ethan Blake",
    userLocation: "Lahore, Pakistan",
    userAvatar: "",
    rating: 4,
    date: "24, Jan 2025",
    time: "03:42 PM",
    reviewText:
      "I recently replaced the LCD screen of my Vivo Y20, and I'm quite impressed with the overall performance. The display is bright and clear, with vibrant colors. The touch sensitivity is excellent, and it feels just like the original screen. Installation was fairly easy, and it fits perfectly. My only downside is that it took a bit longer to receive the part than expected, but once it was installed, everything worked great. Highly recommend for anyone needing a reliable replacement!",
    images: [
      "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
      "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
      "https://adminapi.beston.co/uploads/products/4040/images/PARTS -- BOARD FLEX INFINIX X650 1.webp",
    ],
  },
];

export default function ProductPage() {
  const [favorite, setFavorite] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isReviewsDrawerOpen, setIsReviewsDrawerOpen] = useState(false);
  const [isRatingDrawerOpen, setIsRatingDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => router.back(), 320);
  };

  const handleRatingSubmit = (rating: number, review?: string) => {
    console.log("Rating submitted:", { rating, review });
    setIsRatingDrawerOpen(false);
  };

  const handleOpenRatingDrawer = () => {
    setIsRatingDrawerOpen(true);
  };

  const handleReviewsDrawerClose = () => {
    setIsReviewsDrawerOpen(false);
    setIsRatingDrawerOpen(false);
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", { productId: product.id, quantity });
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString("en-PK")}`;
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="lg:mt-[60px]">
      <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full pb-[120px] md:pb-0 lg:pb-0">
        <div className="max-w-[1600px] mx-auto py-0 md:py-6 lg:py-8">
          <AnimatePresence mode="wait">
            {!isExiting && (
              <motion.div
                key="product-detail"
                initial={{ x: "0%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.32, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Mobile Layout */}
                <div className="lg:hidden space-y-4">
                  {/* Back & Favorite Buttons */}
                  <div className="relative w-full bg-light_mode_color dark:bg-dark_mode_color overflow-hidden rounded-2xl shadow-sm">
                    <button
                      onClick={handleBack}
                      className="absolute z-30 text-light_mode_text dark:text-dark_mode_text left-3 top-3 bg-white/90 dark:bg-dark_mode_color2/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white dark:hover:bg-dark_mode_color2 transition-all shadow-md active:scale-95"
                      aria-label="Go back"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={() => setFavorite(!favorite)}
                      className="absolute z-30 right-3 top-3 bg-white/90 dark:bg-dark_mode_color2/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white dark:hover:bg-dark_mode_color2 transition-all shadow-md active:scale-95"
                      aria-label="Toggle favorite"
                    >
                      <Heart
                        className={`transition-all ${
                          favorite
                            ? "text-red-500 fill-red-500 scale-110"
                            : "text-light_mode_text dark:text-dark_mode_text"
                        }`}
                        size={20}
                      />
                    </button>

                    <ProductImageCarousel
                      banners={product.images.map((item, i) => ({
                        id: String(i),
                        image: item,
                      }))}
                    />
                  </div>

                  {/* Product Info - Mobile */}
                  <div className="w-full space-y-2.5  px-4 sm:px-6 lg:px-8 xl:px-12">
                    {/* Price and Name */}
                    <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 p-4 rounded-xl  shadow-sm">
                      <h2 className="text-2xl text-light_mode_text dark:text-dark_mode_text font-bold mb-2">
                        {formatPrice(product.price)}
                      </h2>
                      <p className="text-sm text-light_mode_text dark:text-dark_mode_text leading-relaxed">
                        {product.name}
                      </p>
                    </div>

                    {/* Rating and Sold */}
                    <div className="flex gap-2.5">
                      <div className="flex-1 bg-light_mode_color1 dark:bg-dark_mode_color1 h-11 rounded-xl flex items-center justify-center gap-1.5 px-3  shadow-sm">
                        <Star
                          size={16}
                          className="text-yellow-400 fill-yellow-400"
                        />
                        <span className="text-xs text-light_mode_text dark:text-dark_mode_text font-semibold">
                          {product.rating}/5
                        </span>
                        <span className="text-[10px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="flex-1 bg-light_mode_color1 dark:bg-dark_mode_color1 h-11 rounded-xl flex items-center justify-center  shadow-sm">
                        <span className="text-xs text-light_mode_text dark:text-dark_mode_text font-semibold">
                          {product.soldCount} Sold
                        </span>
                      </div>
                    </div>

                    {/* Warranty and Description */}
                    <div className="flex gap-2.5">
                      <button className="flex-1 bg-light_mode_color1 dark:bg-dark_mode_color1 h-11 rounded-xl flex items-center justify-center  shadow-sm hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors active:scale-[0.98]">
                        <span className="text-xs text-light_mode_blue_color dark:text-dark_mode_blue_color font-semibold">
                          {product.warranty}
                        </span>
                      </button>
                      <button className="flex-1 bg-light_mode_color1 dark:bg-dark_mode_color1 h-11 rounded-xl flex items-center justify-center gap-1.5  shadow-sm hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors active:scale-[0.98]">
                        <span className="text-xs text-light_mode_text dark:text-dark_mode_text font-semibold">
                          Description
                        </span>
                        <ArrowDescrptionIcon className="w-3 h-3 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
                      </button>
                    </div>

                    {/* Reviews and Quantity */}
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => setIsReviewsDrawerOpen(true)}
                        className="flex-1 bg-light_mode_color1 dark:bg-dark_mode_color1 h-11 rounded-xl flex items-center justify-center gap-1.5  shadow-sm hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors active:scale-[0.98]"
                      >
                        <span className="text-xs text-light_mode_text dark:text-dark_mode_text font-semibold">
                          Reviews
                        </span>
                        <ArrowDescrptionIcon className="w-3 h-3 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
                      </button>
                      <div className="flex-1 bg-light_mode_color1 dark:bg-dark_mode_color1 h-11 rounded-xl flex items-center justify-between px-3  shadow-sm">
                        <button
                          onClick={handleQuantityDecrease}
                          disabled={quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-base text-light_mode_text dark:text-dark_mode_text font-bold min-w-8 text-center">
                          {quantity.toString().padStart(2, "0")}
                        </span>
                        <button
                          onClick={handleQuantityIncrease}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors active:scale-95"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block px-20 ">
                  <div className="flex items-start gap-8 lg:gap-10 xl:gap-12">
                    {/* Left Column - Images */}
                    <div className="w-1/2 space-y-4">
                      {/* Main Image */}
                      <div className="relative w-full aspect-square bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-3xl overflow-hidden  shadow-lg group">
                        <Image
                          src={product.images[selectedImageIndex]}
                          alt={product.name}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                          priority
                        />
                        {/* Back Button */}
                        <button
                          onClick={handleBack}
                          className="absolute top-5 left-5 z-10 bg-white/95 dark:bg-dark_mode_color2/95 backdrop-blur-sm p-3 rounded-full hover:bg-white dark:hover:bg-dark_mode_color2 transition-all shadow-lg hover:shadow-xl active:scale-95"
                          aria-label="Go back"
                        >
                          <ChevronLeft
                            size={20}
                            className="text-light_mode_text dark:text-dark_mode_text"
                          />
                        </button>
                        {/* Favorite Button */}
                        <button
                          onClick={() => setFavorite(!favorite)}
                          className="absolute top-5 right-5 z-10 bg-white/95 dark:bg-dark_mode_color2/95 backdrop-blur-sm p-3 rounded-full hover:bg-white dark:hover:bg-dark_mode_color2 transition-all shadow-lg hover:shadow-xl active:scale-95"
                          aria-label="Toggle favorite"
                        >
                          <Heart
                            className={`transition-all ${
                              favorite
                                ? "text-red-500 fill-red-500 scale-110"
                                : "text-light_mode_text dark:text-dark_mode_text"
                            }`}
                            size={20}
                          />
                        </button>
                      </div>

                      {/* Thumbnail Images */}
                      {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3">
                          {product.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group ${
                                selectedImageIndex === index
                                  ? "border-light_mode_yellow_color dark:border-dark_mode_yellow_color shadow-md scale-[1.02]"
                                  : "border-light_mode_color3/30 dark:border-dark_mode_color3/30 hover:border-light_mode_color3 dark:hover:border-dark_mode_color3 hover:shadow-md"
                              }`}
                            >
                              <Image
                                src={image}
                                alt={`${product.name} - ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="w-1/2 space-y-4">
                      {/* Product Name */}
                      <div className="space-y-3">
                        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-light_mode_text dark:text-dark_mode_text leading-tight">
                          {product.name}
                        </h1>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2 bg-light_mode_color1 dark:bg-dark_mode_color1 px-3 py-1.5 rounded-lg ">
                            <Star
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                            <span className="text-sm text-light_mode_text dark:text-dark_mode_text font-semibold">
                              {product.rating}
                            </span>
                            <span className="text-xs text-light_mode_gray_color dark:text-dark_mode_gray_color">
                              ({product.reviewCount})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-light_mode_gray_color dark:text-dark_mode_gray_color">
                            <span className="text-xs font-medium">
                              {product.soldCount} sold
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price Card */}
                      <div className="bg-gradient-to-br from-light_mode_color2 to-light_mode_color3/30 dark:from-dark_mode_color2 dark:to-dark_mode_color3/30 rounded-xl p-4  shadow-md">
                        <p className="text-xs text-light_mode_gray_color dark:text-dark_mode_gray_color mb-2 font-medium uppercase tracking-wide">
                          Price
                        </p>
                        <h2 className="text-xl lg:text-2xl font-bold text-light_mode_text dark:text-dark_mode_text">
                          {formatPrice(product.price)}
                        </h2>
                      </div>

                      {/* Warranty Card */}
                      <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-xl p-4  shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xs text-light_mode_gray_color dark:text-dark_mode_gray_color mb-2 font-medium uppercase tracking-wide">
                          Warranty
                        </p>
                        <p className="text-base text-light_mode_blue_color dark:text-dark_mode_blue_color font-semibold">
                          {product.warranty}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-xl p-4  shadow-sm">
                        <p className="text-xs text-light_mode_gray_color dark:text-dark_mode_gray_color mb-2 font-medium uppercase tracking-wide">
                          Quantity
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 bg-light_mode_color dark:bg-dark_mode_color rounded-xl p-2 ">
                            <button
                              onClick={handleQuantityDecrease}
                              disabled={quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                            >
                              <Minus
                                size={18}
                                className="text-light_mode_text dark:text-dark_mode_text"
                              />
                            </button>
                            <span className="text-base font-bold text-light_mode_text dark:text-dark_mode_text min-w-12 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={handleQuantityIncrease}
                              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 transition-all active:scale-95"
                            >
                              <Plus
                                size={18}
                                className="text-light_mode_text dark:text-dark_mode_text"
                              />
                            </button>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-light_mode_gray_color dark:text-dark_mode_gray_color mb-2 font-medium uppercase tracking-wide">
                              Total
                            </p>
                            <p className="text-lg font-bold text-light_mode_text dark:text-dark_mode_text">
                              {formatPrice(totalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2.5 pt-1">
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:bg-light_mode_yellow_hover_color dark:hover:bg-dark_mode_yellow_hover_color active:bg-light_mode_yellow_active_color dark:active:bg-dark_mode_yellow_active_color text-dark_mode_color dark:text-light_mode_text font-bold py-3.5 rounded-xl text-base transition-all active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={20} />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => setIsReviewsDrawerOpen(true)}
                          className="w-full bg-light_mode_color1 dark:bg-dark_mode_color1 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text font-semibold py-3 rounded-xl text-sm transition-all active:scale-[0.98]  shadow-sm hover:shadow-md"
                        >
                          View Reviews & Ratings
                        </button>
                      </div>

                      {/* Description Button */}
                      <button className="w-full bg-light_mode_color1 dark:bg-dark_mode_color1 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text font-medium py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2  shadow-sm hover:shadow-md active:scale-[0.98]">
                        <span>View Description</span>
                        <ArrowDescrptionIcon className="w-3.5 h-3.5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Overlay while exiting */}
            {isExiting && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="absolute inset-0 bg-black"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-light_mode_color/95 dark:bg-dark_mode_color/95 backdrop-blur-lg border-t border-light_mode_color3 dark:border-dark_mode_color3 z-50 shadow-2xl">
          <div className="max-w-[1600px] mx-auto px-4 py-3">
            <div className="flex items-stretch gap-2.5">
              <div className="flex-1 bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-xl p-2.5 flex flex-col justify-center h-14">
                <p className="text-[10px] text-light_mode_gray_color dark:text-dark_mode_gray_color mb-0.5 font-medium">
                  Total
                </p>
                <h3 className="text-lg font-bold text-light_mode_text dark:text-dark_mode_text">
                  {formatPrice(totalPrice)}
                </h3>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:bg-light_mode_yellow_hover_color dark:hover:bg-dark_mode_yellow_hover_color active:bg-light_mode_yellow_active_color dark:active:bg-dark_mode_yellow_active_color text-dark_mode_color dark:text-light_mode_text font-bold rounded-xl text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-md hover:shadow-lg h-14"
              >
                <CartIcon className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Drawer */}
      <ReviewsDrawer
        isOpen={isReviewsDrawerOpen}
        onClose={handleReviewsDrawerClose}
        onRateClick={handleOpenRatingDrawer}
        reviews={sampleReviews}
      />

      {/* Rating Drawer */}
      <RatingDrawer
        isOpen={isRatingDrawerOpen}
        onClose={() => setIsRatingDrawerOpen(false)}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
}
