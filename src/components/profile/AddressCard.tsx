"use client";

import React from "react";
import { Edit2, EditIcon, Home, Store } from "lucide-react";
import { HomeIcon } from "@/assets";

interface AddressCardProps {
  id: string;
  index: number;
  label: string;
  type: "home" | "shop" | "work" | "other";
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  onEdit?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  id,
  index,
  label,
  type,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  onEdit,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case "home":
        return <HomeIcon className="w-5 h-5 md:w-6 md:h-6" />;
      case "shop":
        return <Store className="w-5 h-5 md:w-6 md:h-6" />;
      default:
        return <Home className="w-5 h-5 md:w-6 md:h-6" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "home":
        return "Home";
      case "shop":
        return "Shop";
      case "work":
        return "Work";
      default:
        return "Other";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium shrink-0 w-6 md:w-8 text-left pt-1">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex items-start gap-3 p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className=" gap-2">
              <span className=" text-light_mode_blue_color dark:text-dark_mode_blue_color  text-base md:text-lg font-semibold">
                {label}
              </span>
              <div className=" flex items-center gap-2 mt-3">
                <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                  {getTypeIcon()}
                </div>
                <span className="text-dark_mode_text dark:text-dark_mode_text text-[16px] md:text-base">
                  {getTypeLabel()}
                </span>
              </div>
            </div>
            {onEdit && (
              <button
                onClick={onEdit}
                className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1 shrink-0"
                aria-label="Edit address"
              >
                <EditIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
          </div>
          <p className="text-light_mode_text dark:text-dark_mode_text text-[16px] md:text-base opacity-90 mb-1">
            {addressLine1}
          </p>
          {addressLine2 && (
            <p className="text-light_mode_text dark:text-dark_mode_text text-[16px] md:text-base opacity-90 mb-1">
              {addressLine2}
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            <p className="text-light_mode_green_color dark:text-dark_mode_green_color_text text-[16px] md:text-base">
              {city}, {state}
            </p>
            <p className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-[16px] md:text-base">
              {postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
