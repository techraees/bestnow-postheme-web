"use client";

import React from "react";
import { Plus } from "lucide-react";

interface AddAddressCardProps {
  onClick: () => void;
}

const AddAddressCard: React.FC<AddAddressCardProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col border border-dashed border-light_mode_color3 dark:border-dark_mode_color3 items-center justify-center gap-0 p-6 md:p-8  rounded-2xl  active:scale-[0.98] transition-all duration-200"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full  flex items-center justify-center">
        <Plus className="w-8 h-8 md:w-10 md:h-10 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
      </div>
      <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium">
        Add new address
      </span>
    </button>
  );
};

export default AddAddressCard;
