import { useEffect, useState } from "react";

const useTheme = () => {
  const preferDarkQuery = "(prefer-color-scheme: dark)";

  const [mode, setMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    const localMode = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(preferDarkQuery).matches;

    if (localMode === "dark" || localMode === "light") {
      setMode(localMode);
    } else if (prefersDark) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, []);

  useEffect(() => {
    if (mode === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return [mode, setMode] as const;
};

export default useTheme;
