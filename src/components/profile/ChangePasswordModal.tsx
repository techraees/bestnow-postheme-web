"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (oldPassword: string, newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [step, setStep] = useState<"old" | "new">("old");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [error, setError] = useState("");

  // Password requirements
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNumberAndSpecial, setHasNumberAndSpecial] = useState(false);
  const [hasUpperAndLower, setHasUpperAndLower] = useState(false);

  // Check password requirements
  React.useEffect(() => {
    if (step === "new" && newPassword) {
      setHasMinLength(newPassword.length >= 8);
      setHasNumberAndSpecial(
        /[0-9]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
      );
      setHasUpperAndLower(/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword));
    }
  }, [newPassword, step]);

  const handleNext = () => {
    // In production, verify old password here
    if (!oldPassword) {
      setError("Incorrect password");
      return;
    }
    
    // Mock verification - in production, verify with backend
    // For demo purposes, any password will proceed (remove in production)
    setError("");
    setStep("new");
    
    // Production code should be:
    // if (oldPassword === verifiedPassword) {
    //   setError("");
    //   setStep("new");
    // } else {
    //   setError("Incorrect password");
    // }
  };

  const handleConfirm = () => {
    if (newPassword !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    if (!hasMinLength || !hasNumberAndSpecial || !hasUpperAndLower) {
      setError("Password does not meet requirements");
      return;
    }

    setError("");
    onConfirm(oldPassword, newPassword);
    handleClose();
  };

  const handleClose = () => {
    setStep("old");
    setOldPassword("");
    setNewPassword("");
    setRetypePassword("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowRetypePassword(false);
    setError("");
    setHasMinLength(false);
    setHasNumberAndSpecial(false);
    setHasUpperAndLower(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-3xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl font-semibold">
            Change Password
          </h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:opacity-80 active:opacity-60 transition-opacity p-1"
            aria-label="Close"
          >
            <X className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>

        {/* Step 1: Old Password Verification */}
        {step === "old" && (
          <div className="space-y-4 md:space-y-6">
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setError("");
                }}
                placeholder="Current Password"
                className={`w-full bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border rounded-2xl px-4 pr-12 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-light_mode_color3 dark:border-dark_mode_color3 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_gray_color dark:text-dark_mode_gray_color hover:opacity-80 transition-opacity"
                aria-label={showOldPassword ? "Hide password" : "Show password"}
              >
                {showOldPassword ? (
                  <EyeOff className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Eye className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm md:text-base">{error}</p>
            )}

            <button
              onClick={handleNext}
              disabled={!oldPassword}
              className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black dark:text-black py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: New Password Entry */}
        {step === "new" && (
          <div className="space-y-4 md:space-y-6">
            {/* New Password */}
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
                placeholder="Password"
                className="w-full bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color3 dark:border-dark_mode_color3 rounded-2xl px-4 pr-12 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_gray_color dark:text-dark_mode_gray_color hover:opacity-80 transition-opacity"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Eye className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>

            {/* Retype Password */}
            <div className="relative">
              <input
                type={showRetypePassword ? "text" : "password"}
                value={retypePassword}
                onChange={(e) => {
                  setRetypePassword(e.target.value);
                  setError("");
                }}
                placeholder="Retype Password"
                className="w-full bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color3 dark:border-dark_mode_color3 rounded-2xl px-4 pr-12 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
              />
              <button
                type="button"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_gray_color dark:text-dark_mode_gray_color hover:opacity-80 transition-opacity"
                aria-label={showRetypePassword ? "Hide password" : "Show password"}
              >
                {showRetypePassword ? (
                  <EyeOff className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Eye className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    hasMinLength
                      ? "bg-green-500 border-green-500"
                      : "border-light_mode_gray_color dark:border-dark_mode_gray_color"
                  }`}
                >
                  {hasMinLength && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    hasNumberAndSpecial
                      ? "bg-green-500 border-green-500"
                      : "border-light_mode_gray_color dark:border-dark_mode_gray_color"
                  }`}
                >
                  {hasNumberAndSpecial && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                  At least 1 number & Special Character
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    hasUpperAndLower
                      ? "bg-green-500 border-green-500"
                      : "border-light_mode_gray_color dark:border-dark_mode_gray_color"
                  }`}
                >
                  {hasUpperAndLower && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                  At least Upper & Lower case letter
                </span>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm md:text-base">{error}</p>
            )}

            <button
              onClick={handleConfirm}
              disabled={
                !newPassword ||
                !retypePassword ||
                !hasMinLength ||
                !hasNumberAndSpecial ||
                !hasUpperAndLower
              }
              className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black dark:text-black py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;

