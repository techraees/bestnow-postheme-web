"use client";
import { ActionButtonsGrid } from "@/components/action-buttons";
import React, { useEffect } from "react";
import MenuGrid from "./MenuGrid";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "@/redux/store/store";
import { Users } from "lucide-react";

const MenuModal = () => {
  const { user_profile } = useSelector((state: RootState) => state.coreAppSlice);

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
      path: "/",
      onClick: () => {
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <FaviourteIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Favorites",
      path: "#",
      onClick: () => {
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <CartIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "My Cart",
      path: "/cart",
      onClick: () => {
      },

    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <OrderIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Order History",
      path: "#",
      onClick: () => {
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <CategoriesIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Categories",
      path: "#",
      onClick: () => {
      },

    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <LedgerIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Ledger",
      path: user_profile?.id ? "/ledger" : "/login",
      onClick: () => {
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <VoiceIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Voice Search",
      path: "#",
      onClick: () => {
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={`${20 > 0 ? "currentColor" : "currentColor"}`}
            viewBox="0 0 24 24"
            className="w-5 h-5 mb-1"
            focusable="false"
            aria-hidden="true"
            style={{
              pointerEvents: 'none',
              display: 'inherit',
            }}
          >
            <path
              clipRule="evenodd"
              d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
              fillRule="evenodd"
            />
          </svg>
          {20 > 0 && (
            <span
              className={`absolute -top-[0px] -right-[6px] text-[11px] font-[600] p-1 text-white text-center flex items-center justify-center rounded-full  bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color w-[6px] h-[6px]`}
            >
            </span>
          )}
        </div>
      ),
      label: "Community Status",
      path: "/status",
      onClick: () => {
      },
    },
    {
      icon: (
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          <MessageIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
      ),
      label: "Messages",
      path: "#",
      onClick: () => {
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
      path: "#",
      onClick: () => {
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
      path: "#",
      onClick: () => {
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
      path: "/profile",
      onClick: () => {
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
      className="fixed inset-0 w-full h-full bg-light_mode_color z-40 dark:bg-dark_mode_color overflow-y-auto scrollbar_hide_custom"
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
