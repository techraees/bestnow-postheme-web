"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import { AccountField, ChangeEmailModal, ChangePasswordModal } from "@/components/profile";
import { User, Mail, Phone, Lock, X } from "lucide-react";

const AccountPage = () => {
  const router = useRouter();
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isChangePhoneModalOpen, setIsChangePhoneModalOpen] = useState(false);
  const [isChangeNameModalOpen, setIsChangeNameModalOpen] = useState(false);

  // In production, these would come from state/API
  const [fullName, setFullName] = useState("Draven Horst");
  const [email, setEmail] = useState("horizon123@gmail.com");
  const [mobileNumber, setMobileNumber] = useState("+92 300 1234567");
  const [password, setPassword] = useState("•••••••••••••");

  const handleDone = () => {
    router.back();
  };

  const handleEmailChange = (newEmail: string, otp: string) => {
    console.log("Email changed to:", newEmail, "OTP:", otp);
    setEmail(newEmail);
    // In production, verify OTP and update email
  };

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    console.log("Password changed, Old:", oldPassword, "New:", newPassword);
    // In production, verify old password and update to new password
  };

  const handlePhoneChange = (newPhone: string, otp: string) => {
    console.log("Phone changed to:", newPhone, "OTP:", otp);
    setMobileNumber(newPhone);
    // In production, verify OTP and update phone
  };

  const handleNameChange = (newName: string) => {
    console.log("Name changed to:", newName);
    setFullName(newName);
    // In production, update name
  };

  return (
    <TopSpacingWrapper>
      <SubHeader title="Account" subtitle="Done" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
        {/* Full Name Field */}
        <AccountField
          label="Full name"
          icon={<User className="w-5 h-5 md:w-6 md:h-6" />}
          value={fullName}
          onChange={() => setIsChangeNameModalOpen(true)}
        />

        {/* Email Address Field */}
        <AccountField
          label="Email address"
          icon={<Mail className="w-5 h-5 md:w-6 md:h-6" />}
          value={email}
          onChange={() => setIsChangeEmailModalOpen(true)}
        />

        {/* Mobile Number Field */}
        <AccountField
          label="Mobile Number"
          icon={<Phone className="w-5 h-5 md:w-6 md:h-6" />}
          value={mobileNumber}
          onChange={() => setIsChangePhoneModalOpen(true)}
        />

        {/* Password Field */}
        <AccountField
          label="Your Password"
          icon={<Lock className="w-5 h-5 md:w-6 md:h-6" />}
          value={password}
          type="password"
          onChange={() => setIsChangePasswordModalOpen(true)}
        />
      </div>

      {/* Change Email Modal */}
      <ChangeEmailModal
        isOpen={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
        onDone={handleEmailChange}
        title="Change Email address"
        placeholder="New Email"
        icon={<Mail className="w-5 h-5 md:w-6 md:h-6" />}
        type="email"
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onConfirm={handlePasswordChange}
      />

      {/* Change Phone Modal */}
      <ChangeEmailModal
        isOpen={isChangePhoneModalOpen}
        onClose={() => setIsChangePhoneModalOpen(false)}
        onDone={handlePhoneChange}
        title="Change Mobile Number"
        placeholder="New Mobile Number"
        icon={<Phone className="w-5 h-5 md:w-6 md:h-6" />}
        type="tel"
      />

      {/* Change Name Modal - Can create similar modal or reuse */}
      {isChangeNameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-3xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl font-semibold">
                Change Full name
              </h2>
              <button
                onClick={() => setIsChangeNameModalOpen(false)}
                className="text-red-500 hover:opacity-80 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="New Full name"
                className="w-full bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text border border-light_mode_color3 dark:border-dark_mode_color3 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color"
              />
            </div>
            <button
              onClick={() => {
                handleNameChange(fullName);
                setIsChangeNameModalOpen(false);
              }}
              className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg hover:opacity-90 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </TopSpacingWrapper>
  );
};

export default AccountPage;

