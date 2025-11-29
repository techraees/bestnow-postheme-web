"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MdMusicNote } from "react-icons/md";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import {
  useClickBannerMutation,
  useGetAllBannerQuery,
} from "@/redux/api/core/bannerApi";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { ForceBannerDesktop, ForceBannerMobile } from "@/assets";

interface Banner {
  id: string;
  title: string;
  image?: string; // Image URL (desktop)
  mobileImage?: string; // Image URL (mobile)
  tabletImage?: string; // Image URL (tablet)
}

interface PromotionalBannerProps {
  banners?: Banner[];
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  banners: propBanners,
}) => {
  // Fetch banners from API
  const { data: bannersData, isLoading } = useGetAllBannerQuery();

  // Transform API response to component format
  const apiBanners: Banner[] =
    bannersData?.payload
      ?.filter((banner) => {
        // Only show banners that have at least one image
        return (
          banner.mobile_img_path ||
          banner.tablet_img_path ||
          banner.desktop_img_path
        );
      })
      .map((banner) => ({
        id: String(banner.id),
        title: banner.display_name || "",
        image: banner.desktop_img_path
          ? ForceBannerDesktop.src
          : getImgBaseUrl(banner.desktop_img_path),
        mobileImage: banner.mobile_img_path
          ? ForceBannerMobile
          : getImgBaseUrl(banner.mobile_img_path),
        tabletImage: banner.tablet_img_path
          ? ForceBannerDesktop
          : getImgBaseUrl(banner.tablet_img_path),
      })) || [];

  // Use prop banners if provided, otherwise use API banners
  const banners = propBanners || apiBanners;

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

  const [clickBanner] = useClickBannerMutation();
  const handleClickBanner = (bannerId: string) => {
    clickBanner(bannerId);
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-0">
      {/* Banner Card with Swipe Support */}
      <div
        ref={bannerRef}
        className="relative w-full bg-white rounded-2xl md:rounded-3xl lg:rounded-none overflow-hidden h-48 md:h-72 lg:h-96 xl:h-[500px] 2xl:h-[600px] cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Banner Images Container */}
        <div className="relative w-full h-full">
          {isLoading ? (
            // Loading skeleton
            <div className="absolute inset-0 bg-light_mode_color2 dark:bg-dark_mode_color2 animate-pulse" />
          ) : banners.length === 0 ? (
            // Empty state
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-100">
              <div className="text-center px-4">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-gray-600 text-sm">No banners available</p>
              </div>
            </div>
          ) : (
            banners.map((banner, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-500 cursor-pointer ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  onClick={() => handleClickBanner(banner.id)}
                >
                  {/* Mobile Banner - Hidden on tablet and desktop */}
                  {banner.mobileImage && (
                    <Image
                      src={banner.mobileImage}
                      alt={banner.title}
                      fill
                      className=" md:hidden"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  )}
                  {/* Tablet Banner - Hidden on mobile and desktop */}
                  {banner.tabletImage && (
                    <Image
                      src={banner.tabletImage}
                      alt={banner.title}
                      fill
                      className="object-cover hidden md:block lg:hidden"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  )}
                  {/* Desktop Banner - Hidden on mobile and tablet */}
                  {banner.image && (
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover hidden lg:block"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  )}
                  {/* Fallback if no image available */}
                  {!banner.mobileImage &&
                    !banner.tabletImage &&
                    !banner.image && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-100">
                        <div className="text-center px-4">
                          <div className="text-6xl mb-4">📱</div>
                          <p className="text-gray-600 text-sm">
                            {banner.title || "Banner"}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              );
            })
          )}
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

export default PromotionalBanner;
