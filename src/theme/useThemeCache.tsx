import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeThemeInCoreAppSlice } from "@/redux/slice/coreSlice";

const THEME_KEY = "theme";

// System theme detect karna
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

function useThemeCache() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme === "light" || storedTheme === "dark") {
          setTheme(storedTheme);
        } else {
          const defaultTheme = getSystemTheme();
          setTheme(defaultTheme);
          localStorage.setItem(THEME_KEY, defaultTheme);
        }
      } catch (error) {
        console.error("Failed to access localStorage for theme", error);
        setTheme(getSystemTheme());
      }
    }
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, newTheme);
    }
    dispatch(changeThemeInCoreAppSlice(newTheme));
  };

  return { theme, toggleTheme };
}

export default useThemeCache;
