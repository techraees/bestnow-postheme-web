"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
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

const ProfilePage = () => {
  const router = useRouter();

  const handleDone = () => {
    router.back();
    // Or save changes if in edit mode
  };

  const profileMenuItems = [
    {
      id: "account",
      icon: (
        <ProfileIcon className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-5 h-5 md:w-6 md:h-6" />
      ),
      title: "Account",
      subtitle: "dravenhorst123@gmail.com",
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
    <TopSpacingWrapper>
      {/* Header */}
      <SubHeader title="Profile" subtitle="Done" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Profile Information Section */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          {/* Profile Picture with Edit Icon */}
          <div className="relative mb-4 md:mb-6">
            <div className="relative w-[120px] h-[120px] md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-light_mode_color3 dark:border-dark_mode_color3">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
              />
            </div>
            {/* Edit Icon Overlay */}
            <button
              className="absolute bottom-2 right-0 w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-light_mode_blue_color dark:text-dark_mode_blue_color flex items-center justify-center border-2 border-light_mode_color dark:border-dark_mode_color hover:opacity-80 active:scale-95 transition-all"
              aria-label="Edit profile picture"
            >
              <EditIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>

          {/* Name */}
          <h2 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-center">
            Draven Horst
          </h2>

          {/* Email */}
          <p className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base opacity-80 text-center">
            dravenhorst123@gmail.com
          </p>
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
    </TopSpacingWrapper>
  );
};

export default ProfilePage;
