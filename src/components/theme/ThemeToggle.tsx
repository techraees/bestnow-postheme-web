"use client";

import React, { memo, useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "./icons";
import { THEME_DATA } from "@/data/coreData/coreData";

interface ThemeToggleProps {
  theme_mode: string;
  onToggle: () => void;
}

const ThemeToggle = memo(({ theme_mode, onToggle }: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <li>
        <div className="cursor-pointer text-primary">
          <div className="h-5 w-5" />
        </div>
      </li>
    );
  }

  return (
    <li>
      <div className="cursor-pointer text-primary" onClick={onToggle}>
        {theme_mode === THEME_DATA.DARK ? <MoonIcon /> : <SunIcon />}
      </div>
    </li>
  );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
