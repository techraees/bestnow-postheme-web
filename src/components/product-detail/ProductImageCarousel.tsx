// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { HiArrowLeft, HiOutlineHeart, HiHeart } from "react-icons/hi";
// import { HiMagnifyingGlass } from "react-icons/hi2";
// import { useRouter } from "next/navigation";

// interface ProductImageCarouselProps {
//   images: string[];
//   productName: string;
//   isFavorite?: boolean;
//   onFavoriteClick?: () => void;
//   onBack?: () => void;
// }

// const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
//   images = [],
//   productName,
//   isFavorite = false,
//   onFavoriteClick,
//   onBack,
// }) => {
//   const router = useRouter();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleBack = () => {
//     if (onBack) {
//       onBack();
//     } else {
//       router.back();
//     }
//   };

//   const goToImage = (index: number) => {
//     setCurrentImageIndex(index);
//   };

//   const goToNext = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const goToPrevious = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   return (
//     <div className="relative w-full bg-white rounded-b-3xl overflow-hidden">
//       {/* Navigation Buttons */}
//       <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
//         {/* Back Button */}
//         <button
//           onClick={handleBack}
//           className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-400 bg-opacity-80 dark:bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 transition-opacity"
//           aria-label="Go back"
//         >
//           <HiArrowLeft className="h-5 w-5 text-dark_mode_color" />
//         </button>

//         {/* Favorite Button */}
//         <button
//           onClick={onFavoriteClick}
//           className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-400 bg-opacity-80 dark:bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 transition-opacity"
//           aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//         >
//           {isFavorite ? (
//             <HiHeart className="h-5 w-5 text-dark_mode_color fill-current" />
//           ) : (
//             <HiOutlineHeart className="h-5 w-5 text-dark_mode_color" />
//           )}
//         </button>
//       </div>

//       {/* Zoom Button */}
//       <div className="absolute bottom-20 right-4 z-20">
//         <button
//           className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-400 bg-opacity-80 dark:bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 transition-opacity"
//           aria-label="Zoom image"
//         >
//           <HiMagnifyingGlass className="h-5 w-5 text-dark_mode_color" />
//         </button>
//       </div>

//       {/* Image Carousel */}
//       <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
//         {images.length > 0 ? (
//           <>
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-opacity duration-500 ${
//                   index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
//                 }`}
//               >
//                 <Image
//                   src={image}
//                   alt={`${productName} - Image ${index + 1}`}
//                   fill
//                   className="object-contain"
//                   priority={index === 0}
//                   sizes="100vw"
//                 />
//               </div>
//             ))}
//           </>
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//             <p className="text-gray-400">No image available</p>
//           </div>
//         )}
//       </div>

//       {/* Image Indicators */}
//       {images.length > 1 && (
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToImage(index)}
//               className={`transition-all duration-300 ${
//                 index === currentImageIndex
//                   ? "w-2 h-2 bg-white rounded-full"
//                   : "w-2 h-2 bg-gray-400 rounded-full opacity-50"
//               }`}
//               aria-label={`Go to image ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductImageCarousel;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MdMusicNote } from "react-icons/md";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import {
  SunlongDesktopBanner,
  RoyalfalconDesktoopBanner,
  ForceBannerDesktop,
  GoldenCrownDesktopBanner,
  SunlongMobileBanner,
  RoyalfalconMobileBanner,
  ForceBannerMobile,
  GoldenCrownMobileBanner,
} from "@/assets/images";

interface Banner {
  id: string;
  image?: any; // Next.js Image type (mobile)
}

interface ProductImageCarouselProps {
  banners?: Banner[];
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  banners = [
    {
      id: "1",
      image: ForceBannerDesktop,
    },
    {
      id: "2",
      image: GoldenCrownDesktopBanner,
    },
    {
      id: "3",
      image: RoyalfalconDesktoopBanner,
    },
    {
      id: "4",
      image: SunlongDesktopBanner,
    },
  ],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Auto-play functionality
  useEffect(() => {
    // Clear existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    // Start auto-play only if not swiping and multiple banners
    if (banners.length > 1 && !isSwiping) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [banners.length, isSwiping]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsSwiping(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    // Pause auto-play
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsSwiping(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - go to next slide
      goToNext();
    } else if (isRightSwipe) {
      // Swipe right - go to previous slide
      goToPrevious();
    }

    // Reset and resume auto-play after a delay
    setTimeout(() => {
      setIsSwiping(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-light_mode_color dark:bg-dark_mode_color">
      {/* Banner Card with Swipe Support */}
      <div
        ref={bannerRef}
        className="relative w-full bg-white  overflow-hidden h-[350px] md:h-72 lg:h-96 xl:h-[500px] 2xl:h-[600px] cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Banner Images Container */}
        <div className="relative w-full h-full">
          {banners.map((banner, index) => {
            // Use mobile image on mobile, desktop image on desktop
            const bannerImage = banner.image;
            const isActive = index === currentIndex;

            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {bannerImage ? (
                  <>
                    {/* Mobile Banner - Hidden on desktop */}
                    <Image
                      src={bannerImage}
                      alt={`product-${banner.id}`}
                      fill
                      className="object-fill lg:hidden"
                      priority={index === 0}
                      sizes="100vw"
                    />
                    {/* Desktop Banner - Hidden on mobile */}
                    <Image
                      src={banner.image || bannerImage}
                      alt={`product-${banner.id}`}
                      fill
                      className="object-cover hidden lg:block"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-100">
                    <div className="text-center px-4">
                      <div className="text-6xl mb-4">📱</div>
                      <p className="text-gray-600 text-sm">Phone Screens</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-3 md:mt-4 lg:mt-6 px-4 lg:px-0">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 h-1.5 md:w-10 md:h-2 bg-dark_mode_color dark:bg-light_mode_color rounded-full"
                  : "w-1.5 h-1.5 md:w-2 md:h-2 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
