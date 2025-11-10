"use client";
import { ActionButtonsGrid } from "@/components/action-buttons";
import React, { useEffect } from "react";
import MenuGrid from "./MenuGrid";
import { useDispatch } from "react-redux";
import { setIsMenuOpen } from "@/redux/slice/coreSlice";
import { HiXMark } from "react-icons/hi2";
import {
  HomeIcon,
  FaviourteIcon,
  CartIcon,
  OrderIcon,
  CategoriesIcon,
  LedgerIcon,
  VoiceIcon,
  NoficationIcon,
  MessageIcon,
  ReplaceIcon,
  ProfileIcon,
  QuickOrderIcon,
} from "@/assets";
import { useRouter } from "next/navigation";

const MenuModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleCloseMenu = () => {
    dispatch(setIsMenuOpen(false));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseMenu();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const menuData = [
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <HomeIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Home",
      onClick: () => {
        console.log("Home clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <FaviourteIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Favorites",
      onClick: () => {
        console.log("Favorites clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <CartIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "My Cart",
      onClick: () => {
        router.push("/cart");
        console.log("My Cart clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <OrderIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Order History",
      onClick: () => {
        console.log("Order History clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <CategoriesIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Categories",
      onClick: () => {
        console.log("Categories clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <LedgerIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Ledger",
      onClick: () => {
        console.log("Ledger clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <VoiceIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Voice Search",
      onClick: () => {
        console.log("Voice Search clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <QuickOrderIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Quick Order",
      onClick: () => {
        console.log("Quick Order clicked");
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <MessageIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Messages",
      onClick: () => {
        console.log("Messages clicked");
      },
      badge: "10+",
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <NoficationIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Notification",
      onClick: () => {
        console.log("Notification clicked");
      },
      badge: "10+",
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <ReplaceIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Replace & Return",
      onClick: () => {
        console.log("Replace & Return clicked");
      },
      badge: "10+",
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <ProfileIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Profile",
      onClick: () => {
        console.log("Profile clicked");
      },
    },
  ];

  // Update menuData to close menu on item click
  const menuDataWithClose = menuData.map((item) => ({
    ...item,
    onClick: () => {
      item.onClick();
      handleCloseMenu();
    },
  }));

  return (
    <div
      className="fixed inset-0 w-full h-full bg-light_mode_color z-40 dark:bg-dark_mode_color overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-full flex flex-col mt-16">
        <div
          className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-10 flex-1"
          onClick={handleContentClick}
        >
          {/* Menu Grid */}
          <div className="mt-4">
            <MenuGrid data={menuDataWithClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
