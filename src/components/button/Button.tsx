"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black hover:bg-light_mode_yellow_hover_color dark:hover:bg-dark_mode_yellow_hover_color focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color",
    secondary:
      "bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 focus:ring-light_mode_color2 dark:focus:ring-dark_mode_color2",
    outline:
      "border-2 border-light_mode_yellow_color dark:border-dark_mode_yellow_color text-light_mode_yellow_color dark:text-dark_mode_yellow_color hover:bg-light_mode_yellow_color dark:hover:bg-dark_mode_yellow_color hover:text-black focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color",
    ghost:
      "text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 focus:ring-light_mode_color2 dark:focus:ring-dark_mode_color2",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;

