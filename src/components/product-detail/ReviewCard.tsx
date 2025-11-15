"use client";

import React from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import { Calendar } from "lucide-react";

interface ReviewCardProps {
  review: {
    id: string;
    userName: string;
    userLocation: string;
    userAvatar?: string;
    rating: number;
    date: string;
    time: string;
    reviewText: string;
    images?: string[];
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl p-4 space-y-4">
      {/* User Info */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-light_mode_color3 dark:bg-dark_mode_color3 overflow-hidden flex-shrink-0">
          {review.userAvatar ? (
            <Image
              src={review.userAvatar}
              alt={review.userName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-light_mode_text dark:text-dark_mode_text font-semibold text-lg">
              {review.userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* User Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-light_mode_text dark:text-dark_mode_text font-semibold text-base">
              {review.userName}
            </h4>
            <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm">
              •
            </span>
            <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm">
              {review.userLocation}
            </span>
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-1 mt-1">
            <Calendar className="h-3 w-3 text-light_mode_blue_color dark:text-dark_mode_blue_color" />
            <span className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-xs md:text-sm">
              {review.date} - {review.time}
            </span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating
          rating={review.rating}
          onRatingChange={() => {}}
          size={16}
          interactive={false}
        />
        <span className="text-light_mode_text dark:text-dark_mode_text text-sm font-medium">
          {review.rating}/5
        </span>
      </div>

      {/* Review Text */}
      <p className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base leading-relaxed">
        {review.reviewText}
      </p>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-light_mode_color3 dark:bg-dark_mode_color3"
            >
              <Image
                src={image}
                alt={`Review image ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;

