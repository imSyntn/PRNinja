"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggleButton = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`cursor-pointer ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-neutral-100" />
      ) : (
        <Moon className="h-5 w-5 text-neutral-800" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;
