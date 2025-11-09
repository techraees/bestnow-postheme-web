"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeThemeInCoreAppSlice } from "@/redux/slice/coreSlice";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  // Initial theme setup from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const root = document.documentElement;

    // Apply theme class
    if (storedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Initialize Redux state
    dispatch(changeThemeInCoreAppSlice(storedTheme));
  }, [dispatch]);

  // Update theme class when Redux state changes
  useEffect(() => {
    if (theme_mode) {
      const root = document.documentElement;
      if (theme_mode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme_mode]);

  return <>{children}</>;
}
