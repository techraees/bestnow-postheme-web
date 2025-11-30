"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
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
import { getCookie, removeCookie } from "@/utils/coreUtils/cookieFunction";
import { COOKIES_LOGIN_TOKENS } from "@/data/coreData/coreData";
import { toast } from "react-toastify";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
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
    // toast.success("Logout successfully");

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
        <ProfileIcon className=" w-5 h-5" />
      ),
      title: "Account",
      subtitle: userEmail || "Account settings",
      path: "/profile/account",
    },
    {
      id: "address",
      icon: (
        <MapIcon className=" w-5 h-5" />
      ),
      title: "Address",
      subtitle: "Delivery address",
      path: "/profile/address",
    },
    {
      id: "notifications",
      icon: (
        <NotificationIcon className=" w-5 h-5" />
      ),
      title: "Notifications",
      subtitle: "Push • Email",
      path: "/profile/notifications",
    },
    {
      id: "membership",
      icon: (
        <MembershipIcon className=" w-5 h-5" />
      ),
      title: "Membership",
      subtitle: "Gold • Score",
      path: "/profile",
    },
    {
      id: "security",
      icon: (
        <SecurityIcon className=" w-5 h-5" />
      ),
      title: "Security",
      subtitle: "2 Factor • Mobile Number",
      path: "/profile",
    },
    {
      id: "apps-devices",
      icon: (
        <DeviceIcon className=" w-5 h-5" />
      ),
      title: "Apps & Devices",
      subtitle: "Gmail • Google",
      path: "/profile",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/profile") {
      return pathname === "/profile";
    }
    return pathname.startsWith(path);
  };

  return (
    <TopSpacingWrapper>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Desktop Layout - Dashboard Style */}
        <div className="hidden lg:block">
          <div className="flex gap-6 lg:gap-8 py-8 lg:py-12">
            {/* Left Sidebar - Profile Menu */}
            <div className="w-80 shrink-0">
              <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl shadow-lg p-6 sticky top-8">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center mb-6 pb-6 border-b border-light_mode_color3 dark:border-dark_mode_color3">
                  <div className="relative mb-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-light_mode_color3 dark:border-dark_mode_color3 shadow-md">
                      <Image
                        src={profileImage}
                        alt="Profile"
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    {/* Edit Icon Overlay */}
                    <button
                      className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-light_mode_blue_color dark:bg-dark_mode_blue_color flex items-center justify-center border-2 border-light_mode_color dark:border-dark_mode_color hover:opacity-80 active:scale-95 transition-all shadow-md"
                      aria-label="Edit profile picture"
                    >
                      <EditIcon className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>

                  {/* Name and Email */}
                  {userName && (
                    <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg font-bold mb-1 text-center">
                      {userName}
                    </h2>
                  )}
                  {userEmail && (
                    <p className="text-light_mode_text dark:text-dark_mode_text text-sm opacity-70 text-center">
                      {userEmail}
                    </p>
                  )}
                </div>

                {/* Menu Items */}
                <div className="space-y-1 mb-6">
                  {profileMenuItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <button
                        key={item.id}
                        onClick={() => router.push(item.path)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                          active
                            ? "bg-light_mode_yellow_color/10 dark:bg-dark_mode_yellow_color/10 hover:bg-light_mode_yellow_color/20 dark:hover:bg-dark_mode_yellow_color/20"
                            : "hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 text-light_mode_yellow_color dark:text-dark_mode_yellow_color"
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            active
                              ? "bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black"
                              : "bg-light_mode_color2 dark:bg-dark_mode_color2 group-hover:bg-light_mode_color3 dark:group-hover:bg-dark_mode_color3"
                          }`}
                        >
                          {item.icon}
                        </div>

                        {/* Title and Subtitle */}
                        <div className="flex-1 flex flex-col gap-0.5 text-left min-w-0">
                          <span
                            className={`text-sm font-semibold truncate ${
                              active
                                ? "text-light_mode_text dark:text-dark_mode_text"
                                : "text-light_mode_text dark:text-dark_mode_text"
                            }`}
                          >
                            {item.title}
                          </span>
                          <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs truncate">
                            {item.subtitle}
                          </span>
                        </div>

                        {/* Arrow Icon */}
                        <ChevronLeft className="w-4 h-4 text-light_mode_text dark:text-dark_mode_text opacity-40 rotate-180 group-hover:opacity-60 transition-opacity shrink-0" />
                      </button>
                    );
                  })}
                </div>

                {/* Logout Button */}
                <Button
                  type="submit"
                  isLoading={isLoading}
                  fullWidth
                  variant="primary"
                  size="md"
                  className="rounded-xl"
                  onClick={handleLogout}
                >
                  Logout
                </Button>

                {/* Footer Link */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => console.log("Terms & Condition clicked")}
                    className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-xs hover:opacity-80 active:opacity-60 transition-opacity"
                  >
                    Terms & Condition
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content Area - Child Pages */}
            <div className="flex-1">{children}</div>
          </div>
        </div>

        {/* Mobile Layout - No Sidebar */}
        <div className="lg:hidden">{children}</div>
      </div>
    </TopSpacingWrapper>
  );
}
