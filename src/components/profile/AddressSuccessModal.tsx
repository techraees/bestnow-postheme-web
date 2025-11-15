"use client";

import React from "react";
import { Check } from "lucide-react";

interface AddressSuccessModalProps {
  isOpen: boolean;
  onDone: () => void;
}

const AddressSuccessModal: React.FC<AddressSuccessModalProps> = ({
  isOpen,
  onDone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-3xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color flex items-center justify-center">
            <Check className="w-10 h-10 md:w-12 md:h-12 text-black" strokeWidth={3} />
          </div>

          {/* Success Message */}
          <h2 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl font-semibold">
            Address add successfully!
          </h2>

          {/* Done Button */}
          <button
            onClick={onDone}
            className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black dark:text-black py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSuccessModal;

