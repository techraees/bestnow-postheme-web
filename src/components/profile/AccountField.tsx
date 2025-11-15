"use client";

import React from "react";

interface AccountFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  type?: "text" | "password";
  onChange?: () => void;
}

const AccountField: React.FC<AccountFieldProps> = ({
  label,
  icon,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <div className="space-y-2 mb-4 md:mb-6">
      <label className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base block">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          readOnly
          className="w-full bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl pl-12 pr-24 py-3 md:py-4 text-sm md:text-base focus:outline-none"
        />
        <button
          onClick={onChange}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base font-medium hover:opacity-80 active:opacity-60 transition-opacity"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default AccountField;

