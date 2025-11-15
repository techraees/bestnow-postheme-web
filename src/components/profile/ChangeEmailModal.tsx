"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDone: (newValue: string, otp: string) => void;
  title?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: "email" | "text" | "tel";
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({
  isOpen,
  onClose,
  onDone,
  title = "Change Email address",
  placeholder = "New Email",
  icon,
  type = "email",
}) => {
  const [newValue, setNewValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOTP = () => {
    if (newValue) {
      setOtpSent(true);
      // In production, send OTP to email/phone here
      console.log("OTP sent to:", newValue);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleDone = () => {
    const otpCode = otp.join("");
    if (newValue && otpCode.length === 6) {
      onDone(newValue, otpCode);
      handleClose();
    }
  };

  const handleClose = () => {
    setNewValue("");
    setOtp(["", "", "", "", "", ""]);
    setOtpSent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-3xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl font-semibold">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:opacity-80 active:opacity-60 transition-opacity p-1"
            aria-label="Close"
          >
            <X className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>

        {/* New Value Input */}
        <div className="mb-4 md:mb-6">
          <div className="relative">
            {icon && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                {icon}
              </div>
            )}
            <input
              type={type}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={placeholder}
              disabled={otpSent}
              className={`w-full bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color3 dark:border-dark_mode_color3 rounded-2xl ${icon ? "pl-12" : "pl-4"} pr-24 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color disabled:opacity-60`}
            />
            <button
              onClick={handleSendOTP}
              disabled={!newValue || otpSent}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base font-medium hover:opacity-80 active:opacity-60 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send OTP
            </button>
          </div>
        </div>

        {/* OTP Input Fields */}
        {otpSent && (
          <div className="mb-6 md:mb-8">
            <div className="flex gap-2 md:gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 md:w-14 md:h-14 bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text border border-light_mode_color3 dark:border-dark_mode_color3 rounded-xl text-center text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
                />
              ))}
            </div>
          </div>
        )}

        {/* Done Button */}
        <button
          onClick={handleDone}
          disabled={!newValue || !otpSent || otp.join("").length !== 6}
          className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black dark:text-black py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ChangeEmailModal;

