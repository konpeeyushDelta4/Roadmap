"use client";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const [themeNow, setThemeNow] = useState("dark");

  useEffect(() => {
    if (theme) {
      setThemeNow(theme);
    }
  }, [theme]);

  return (
    <div>
      <Button
        disableRipple
        variant="light"
        radius="full"
        isIconOnly
        onPress={
          theme === "light" ? () => setTheme("dark") : () => setTheme("light")
        }
        className={` flex justify-center items-center`}
      >
        {themeNow === "light" ? (
          <span className="text-zinc-800">
            <MoonIcon />
          </span>
        ) : (
          <span className="text-yellow-400">
            <SunIcon />
          </span>
        )}
      </Button>
    </div>
  );
}
