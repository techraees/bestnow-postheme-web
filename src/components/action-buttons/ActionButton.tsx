"use client";

import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  badge,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-[20px] p-3 md:p-4 flex flex-col items-center justify-center gap-2 min-h-[90px] md:min-h-[100px] hover:opacity-90 transition-opacity active:scale-95 w-full"
    >
      {/* Badge */}
      {badge !== undefined && badge !== null && (
        <span className="absolute top-2 right-3 text-xs text-blue-400 font-semibold">
          {badge}
        </span>
      )}

      {/* Icon */}
      <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-xl md:text-2xl">
        {icon}
      </div>

      {/* Label */}
      <span className="text-light_mode_text dark:text-dark_mode_text text-xs md:text-sm font-medium text-center leading-tight">
        {label}
      </span>
    </button>
  );
};

export default ActionButton;
