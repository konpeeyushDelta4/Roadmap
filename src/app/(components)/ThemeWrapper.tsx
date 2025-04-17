"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only apply theme after component has mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // During SSR and initial render, don't apply theme class to avoid hydration mismatch
  if (!mounted) {
    return <main className="text-foreground bg-background">{children}</main>;
  }
  
  return <main className={`${theme} text-foreground bg-background`}>{children}</main>;
}
