"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ProfileMenuItem } from "@/components/profile";
import Image from "next/image";
import {
  ChevronLeft,
  User,
  MapPin,
  Bell,
  Crown,
  Shield,
  Monitor,
  Link as LinkIcon,
} from "lucide-react";
import SubHeader from "@/components/navigation/SubHeader";
import {
  ProfileIcon,
  EditIcon,
  profileImage,
  MapIcon,
  NotificationIcon,
  MembershipIcon,
  SecurityIcon,
  DeviceIcon,
} from "@/assets";
import { Button } from "@/components/button";
import { useLogoutCustomerMutation } from "@/redux/api/auth/customerAuthApi";
import { useVerifyTokenQuery } from "@/redux/api/auth/customerAuthProfileApi";
import { selectUserProfile } from "@/redux/slice/coreSlice";
import { getCookie, removeCookie } from "@/utils/coreUtils/cookieFunction";
import { COOKIES_LOGIN_TOKENS } from "@/data/coreData/coreData";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const [logoutCustomer, { isLoading }] = useLogoutCustomerMutation();

  // Fetch user profile data
  useVerifyTokenQuery(undefined);

  // Get user profile from Redux state
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);

  // Extract user data
  const userName = user_profile?.name || user_profile?.username || "";
  const userEmail = user_profile?.email || "";

  const handleLogout = async () => {
    const getRefreshTokenFromCookie = getCookie(
      COOKIES_LOGIN_TOKENS.REFRESH_TOKEN
    );

    // Call the api
    logoutCustomer({ refresh_token: getRefreshTokenFromCookie });

    // Now clear the redux state by reloading the page
    toast.success("Logout successfully");

    // Remove the cookies
    removeCookie(COOKIES_LOGIN_TOKENS.REFRESH_TOKEN);
    removeCookie(COOKIES_LOGIN_TOKENS.ACCESS_TOKEN);
    sessionStorage.removeItem("user_context");
    // Now Redirecting
    window.location.href = "/";
  };

  const profileMenuItems = [
    {
      id: "account",
      icon: (
        <ProfileIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5 md:w-6 md:h-6" />
      ),
      title: "Account",
      subtitle: userEmail || "Account settings",
      onClick: () => router.push("/profile/account"),
    },
    {
      id: "address",
      icon: (
        <MapIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5 md:w-6 md:h-6" />
      ),
      title: "Address",
      subtitle: "Delivery address",
      onClick: () => router.push("/profile/address"),
    },
    {
      id: "notifications",
      icon: (
        <NotificationIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5 md:w-6 md:h-6" />
      ),
      title: "Notifications",
      subtitle: "Push • Email",
      onClick: () => router.push("/profile/notifications"),
    },
    {
      id: "membership",
      icon: (
        <MembershipIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5 md:w-6 md:h-6" />
      ),
      title: "Membership",
      subtitle: "Gold • Score",
      onClick: () => console.log("Membership clicked"),
    },
    {
      id: "security",
      icon: (
        <SecurityIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5 md:w-6 md:h-6" />
      ),
      title: "Security",
      subtitle: "2 Factor • Mobile Number",
      onClick: () => console.log("Security clicked"),
    },
    {
      id: "apps-devices",
      icon: (
        <DeviceIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5 md:w-6 md:h-6" />
      ),
      title: "Apps & Devices",
      subtitle: "Gmail • Google",
      onClick: () => console.log("Apps & Devices clicked"),
    },
  ];

  return (
    <>
      {/* Header */}
      <SubHeader title="Profile" subtitle="Done" />

      {/* Desktop Layout - Content in Right Area */}
      <div className="hidden lg:block">
        <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl shadow-lg p-8 lg:p-10">
          {/* Profile Overview Section */}
          <div className="mb-8">
            <h1 className="text-light_mode_text dark:text-dark_mode_text text-3xl font-bold mb-2">
              Profile Overview
            </h1>
            <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-base">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Details Cards */}
          <div className="grid grid-cols-1 gap-6">
            {/* Account Info Card */}
            <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl p-6">
              <h3 className="text-light_mode_text dark:text-dark_mode_text text-lg font-semibold mb-4">
                Account Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm">
                    Full Name
                  </span>
                  <span className="text-light_mode_text dark:text-dark_mode_text text-sm font-medium">
                    {userName || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm">
                    Email
                  </span>
                  <span className="text-light_mode_text dark:text-dark_mode_text text-sm font-medium">
                    {userEmail || "Not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl p-6">
              <h3 className="text-light_mode_text dark:text-dark_mode_text text-lg font-semibold mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => router.push("/profile/account")}
                  className="bg-light_mode_color1 dark:bg-dark_mode_color1 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 rounded-lg p-4 text-left transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ProfileIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5" />
                    <span className="text-light_mode_text dark:text-dark_mode_text text-sm font-semibold">
                      Edit Account
                    </span>
                  </div>
                  <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs">
                    Update your personal information
                  </p>
                </button>
                <button
                  onClick={() => router.push("/profile/address")}
                  className="bg-light_mode_color1 dark:bg-dark_mode_color1 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 rounded-lg p-4 text-left transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <MapIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5" />
                    <span className="text-light_mode_text dark:text-dark_mode_text text-sm font-semibold">
                      Manage Address
                    </span>
                  </div>
                  <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs">
                    Add or edit delivery addresses
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Profile Information Section */}
          <div className="flex flex-col items-center mb-6 md:mb-8">
            {/* Profile Picture with Edit Icon */}
            <div className="relative mb-4 md:mb-6">
              <div className="relative w-[120px] h-[120px] md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-light_mode_color3 dark:border-dark_mode_color3">
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>
              {/* Edit Icon Overlay */}
              <button
                className="absolute bottom-2 right-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light_mode_blue_color dark:text-dark_mode_blue_color flex items-center justify-center border-2 border-light_mode_color dark:border-dark_mode_color hover:opacity-80 active:scale-95 transition-all"
                aria-label="Edit profile picture"
              >
                <EditIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>

            {/* Name */}
            {userName && (
              <h2 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl font-bold mb-1 md:mb-2 text-center">
                {userName}
              </h2>
            )}

            {/* Email */}
            {userEmail && (
              <p className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base opacity-80 text-center">
                {userEmail}
              </p>
            )}
          </div>

          {/* Horizontal Line Separator */}
          <div className="border-t border-light_mode_color3 dark:border-dark_mode_color3 mb-2 md:mb-8"></div>

          {/* Settings Menu List */}
          <div className="space-y-0 md:space-y-3 mb-8 md:mb-12">
            {profileMenuItems.map((item) => (
              <ProfileMenuItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onClick={item.onClick}
              />
            ))}
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            variant="primary"
            size="md"
            className="!rounded-full"
            onClick={handleLogout}
          >
            Logout
          </Button>

          {/* Footer Link */}
          <div className="flex bg-light_mode_color dark:bg-dark_mode_color justify-center fixed bottom-4 left-0 right-0">
            <button
              onClick={() => console.log("Terms & Condition clicked")}
              className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base hover:opacity-80 active:opacity-60 transition-opacity"
            >
              Terms & Condition
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
