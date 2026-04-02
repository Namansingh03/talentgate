"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="
        rounded-full p-2 transition-colors duration-200
        bg-neutral-100 hover:bg-neutral-200
        dark:bg-neutral-800 dark:hover:bg-neutral-700
        text-neutral-700 dark:text-neutral-200
      "
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
