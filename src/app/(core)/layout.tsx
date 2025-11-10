"use client";
import { AppHeader } from "@/components/header";
import { setIsMenuOpen } from "@/redux/slice/coreSlice";
import useThemeCache from "@/theme/useThemeCache";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuModal from "@/components/MenuModal/MenuModal";

interface CoreLayoutProps {
  children: React.ReactNode;
}

const CoreLayout = ({ children }: CoreLayoutProps) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const { toggleTheme } = useThemeCache();
  const isMenuOpen = useSelector((state: any) => state.coreAppSlice.isMenuOpen);
  const dispatch = useDispatch();
  const handleMenuClick = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
    console.log("isMenuOpen", isMenuOpen);
  };
  return (
    <div className="min-h-screen mt-10 bg-light_mode_color dark:bg-dark_mode_color w-full overflow-x-hidden">
      <AppHeader
        theme_mode={theme_mode}
        onMenuClick={handleMenuClick}
        onThemeToggle={toggleTheme}
      />

      {children}
      {isMenuOpen && <MenuModal />}
    </div>
  );
};

export default CoreLayout;
