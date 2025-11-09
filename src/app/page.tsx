"use client";
import ThemeToggle from "@/components/theme/ThemeToggle";
import useThemeCache from "@/theme/useThemeCache";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const { theme_mode, user_profile } = useSelector(
    (state: any) => state.coreAppSlice
  );
  const { theme, toggleTheme } = useThemeCache();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ThemeToggle theme_mode={theme_mode} onToggle={toggleTheme} />
    </div>
  );
}
