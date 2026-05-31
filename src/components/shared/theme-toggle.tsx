"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="sm" aria-label="Toggle theme" />;
  }

  const dark = resolvedTheme === "dark";

  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(dark ? "light" : "dark")} aria-label="Toggle theme">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
