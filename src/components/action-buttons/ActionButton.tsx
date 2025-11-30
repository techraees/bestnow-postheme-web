"use client";

import Link from "next/link";
import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  path?: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  badge,
  onClick,
  path
}) => {
  console.log(path)
  return (
    <>
      {path ?
        (
          <Link
            href={path}
            onClick={onClick}
            className="relative cursor-pointer bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-[20px] p-3 md:p-4 lg:p-5 flex flex-col items-center justify-center gap-2 min-h-[90px] md:min-h-[100px] lg:min-h-[140px] hover:opacity-90 transition-opacity active:scale-95 w-full"
          >
            {/* Badge */}
            {badge !== undefined && badge !== null && (
              <span className="absolute top-2 right-3 text-xs text-blue-400 font-semibold">
                {badge}
              </span>
            )}

            {/* Icon */}
            <div className="">{icon}</div>

            {/* Label */}
            <span className="text-light_mode_text mt-1 dark:text-dark_mode_text text-xs md:text-sm lg:text-[18px] font-medium text-center leading-tight">
              {label}
            </span>
          </Link>
        )
        : (
          <button
            onClick={onClick}
            className="relative cursor-pointer bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-[20px] p-3 md:p-4 lg:p-5 flex flex-col items-center justify-center gap-2 min-h-[90px] md:min-h-[100px] lg:min-h-[140px] hover:opacity-90 transition-opacity active:scale-95 w-full"
          >
            {/* Badge */}
            {badge !== undefined && badge !== null && (
              <span className="absolute top-2 right-3 text-xs text-blue-400 font-semibold">
                {badge}
              </span>
            )}

            {/* Icon */}
            <div className="">{icon}</div>

            {/* Label */}
            <span className="text-light_mode_text mt-1 dark:text-dark_mode_text text-xs md:text-sm lg:text-[18px] font-medium text-center leading-tight">
              {label}
            </span>
          </button>
        )}
    </>

  );
};

export default ActionButton;
