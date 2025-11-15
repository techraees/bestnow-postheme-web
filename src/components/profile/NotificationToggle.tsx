"use client";

import React from "react";

interface NotificationToggleProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({
  title,
  description,
  isEnabled,
  onToggle,
}) => {
  return (
    <div className="p-4 md:p-5 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-bold">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium ${
              isEnabled ? "text-light_mode_text" : "text-light_mode_gray_color"
            }`}
          >
            {isEnabled ? "ON" : "OFF"}
          </span>
          <button
            type="button"
            onClick={() => onToggle(!isEnabled)}
            className={`relative w-14 h-7 md:w-16 md:h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color ${
              isEnabled
                ? "bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color"
                : "bg-light_mode_color3 dark:bg-dark_mode_color3"
            }`}
            aria-label={`Toggle ${title}`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-white transition-transform duration-200 shadow-md ${
                isEnabled ? "translate-x-7 md:translate-x-9" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
      <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default NotificationToggle;

