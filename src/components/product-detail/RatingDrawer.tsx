"use client";

import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import StarRating from "./StarRating";

interface RatingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review?: string) => void;
}

const RatingDrawer: React.FC<RatingDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

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

  useEffect(() => {
    if (!isOpen) {
      // Reset form when drawer closes
      setRating(0);
      setReview("");
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review);
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
          className="fixed inset-0 z-[60] flex items-end"
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
              Rate & Review
            </h2>
            <button
              onClick={onClose}
              className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-2 rounded-full hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
              aria-label="Close rating"
            >
              <HiXMark className="h-6 w-6 md:h-7 md:w-7 text-red-500" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-6 space-y-6">
            {/* Rating Section */}
            <div className="flex flex-col items-center justify-center py-4">
              <h3 className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium mb-4">
                How would you rate this product?
              </h3>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size={32}
                interactive={true}
              />
              {rating > 0 && (
                <p className="mt-3 text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
                  {rating}/5
                </p>
              )}
            </div>

            {/* Review Text Section */}
            <div>
              <label
                htmlFor="review"
                className="block text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium mb-3"
              >
                Write a review (Optional)
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={6}
                className="w-full bg-light_mode_color dark:bg-dark_mode_color text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color3 dark:border-dark_mode_color3 rounded-2xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-light_mode_color2 dark:bg-dark_mode_color2 border-t border-light_mode_color3 dark:border-dark_mode_color3 px-4 sm:px-6 py-4">
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`w-full font-bold py-3 md:py-4 rounded-2xl text-sm md:text-base transition-all active:scale-95 shadow-md ${
                rating > 0
                  ? "bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 text-dark_mode_color dark:text-light_mode_text"
                  : "bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_gray_color dark:text-dark_mode_gray_color cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingDrawer;

