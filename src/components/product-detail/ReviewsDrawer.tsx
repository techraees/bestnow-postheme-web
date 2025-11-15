"use client";

import React, { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { ReviewCard } from "@/components/product-detail";

interface Review {
  id: string;
  userName: string;
  userLocation: string;
  userAvatar?: string;
  rating: number;
  date: string;
  time: string;
  reviewText: string;
  images?: string[];
}

interface ReviewsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRateClick: () => void;
  reviews: Review[];
}

const ReviewsDrawer: React.FC<ReviewsDrawerProps> = ({
  isOpen,
  onClose,
  onRateClick,
  reviews,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-end"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-light_mode_color2 dark:bg-dark_mode_color2 border-b border-light_mode_color3 dark:border-dark_mode_color3 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-semibold">
                Rating & Reviews
              </h2>
              <button
                onClick={onClose}
                className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-2 rounded-full hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
                aria-label="Close reviews"
              >
                <HiXMark className="h-6 w-6 md:h-7 md:w-7 text-red-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-6 space-y-4">
              {/* Rate Button */}
              <button
                onClick={onRateClick}
                className="w-full h-[48px] bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-dark_mode_color dark:text-light_mode_text text-[16px] font-semibold rounded-full flex items-center justify-center gap-2 hover:opacity-90 active:opacity-80 transition-opacity"
              >
                <Star
                  size={18}
                  className="text-dark_mode_color dark:text-light_mode_text fill-dark_mode_color dark:fill-light_mode_text"
                />
                Rate & Review
              </button>

              {/* Reviews List */}
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-light_mode_text dark:text-dark_mode_text text-base">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewsDrawer;

