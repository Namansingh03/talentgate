"use client";

import { useTheme } from "next-themes";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg border dark:border-gray-600"
    >
      {resolvedTheme === "dark" ? (
        <MdSunny className="text-yellow-400" />
      ) : (
        <FaMoon />
      )}
    </button>
  );
}
