"use client";
import useTheme from "@/hooks/use-theme";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeButton = () => {
  const [theme, setTheme] = useTheme();

  const handleThemeToggle = () =>
    setTheme((mode) => (mode === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      className="flex size-8 cursor-pointer items-center justify-center rounded-full"
      onClick={handleThemeToggle}
    >
      {theme === "light" ? (
        <IconSun className="size-6" />
      ) : (
        <IconMoon className="size-6" />
      )}
    </button>
  );
};

export default ThemeButton;
