"use client";
import { AppHeader } from "@/components/header";
import { BottomNavbar } from "@/components/navigation";
import { setIsMenuOpen } from "@/redux/slice/coreSlice";
import useThemeCache from "@/theme/useThemeCache";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuModal from "@/components/MenuModal/MenuModal";
import { usePathname } from "next/navigation";
import { HIDDEN_HEADER_ROUTES } from "@/constants/routes";

interface CoreLayoutProps {
  children: React.ReactNode;
}

const CoreLayout = ({ children }: CoreLayoutProps) => {
  const pathname = usePathname();
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const { toggleTheme } = useThemeCache();
  const isMenuOpen = useSelector((state: any) => state.coreAppSlice.isMenuOpen);
  const dispatch = useDispatch();
  const handleMenuClick = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
    console.log("isMenuOpen", isMenuOpen);
  };

  // Check if current route should hide header
  const shouldHideHeader = HIDDEN_HEADER_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full overflow-x-hidden pb-16 lg:pb-0">
      <AppHeader
        theme_mode={theme_mode}
        onMenuClick={handleMenuClick}
        onThemeToggle={toggleTheme}
      />

      {/* Add top margin only if header is visible */}
      <div className={shouldHideHeader ? "" : ""}>{children}</div>

      {isMenuOpen && <MenuModal />}

      {/* Bottom Navigation - Mobile Only */}
      {/* <BottomNavbar cartCount={10} /> */}
    </div>
  );
};

export default CoreLayout;
