"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggleButton = ({
  className,
  text,
  size
}: {
  className?: string;
  text?: string;
  size?: "default" | "sm" | "lg" | "icon";
}) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Button
      variant="outline"
      size={size ? size : "icon"}
      className={`cursor-pointer ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-neutral-100" />
      ) : (
        <Moon className="h-5 w-5 text-neutral-800" />
      )}
      {text}
    </Button>
  );
};

export default ThemeToggleButton;
