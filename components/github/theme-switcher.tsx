"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "dark" ? (
        <Button variant="ghost" onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4 text-yellow-500" />
        </Button>
      ) : (
        <Button variant="ghost" onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4 text-gray-500" />
        </Button>
      )}
    </>
  );
};
