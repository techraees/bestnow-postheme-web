"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  confirmButtonColor?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  confirmButtonColor = "bg-light_mode_red_color dark:bg-dark_mode_red_color",
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-light_mode_color dark:bg-dark_mode_color rounded-2xl md:rounded-3xl shadow-2xl w-[90%] max-w-md mx-4 transform transition-all"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-light_mode_color2 dark:border-dark_mode_color2">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-light_mode_text dark:text-dark_mode_text">
            {title}
          </h2>
          {!isLoading && (
            <button
              onClick={onClose}
              className="text-light_mode_text dark:text-dark_mode_text hover:opacity-70 transition-opacity rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <p className="text-base md:text-lg text-light_mode_text dark:text-dark_mode_text text-center">
            {message}
          </p>
        </div>

        {/* Footer - Buttons */}
        <div className="flex gap-3 md:gap-4 p-4 md:p-6 border-t border-light_mode_color2 dark:border-dark_mode_color2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 md:py-3 bg-light_mode_color2 dark:bg-dark_mode_color2 hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-light_mode_text dark:text-dark_mode_text rounded-xl md:rounded-2xl font-medium text-sm md:text-base transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 md:py-3 ${confirmButtonColor} hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl md:rounded-2xl font-medium text-sm md:text-base transition-all`}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

