import { Moon, Sun } from "lucide";
import { useEffect, useState } from "react";
import { MorphIcon } from "morphicons/react";

export default function Header() {
  const [theme, setTheme] = useState<"system" | "dark" | "light">();
  const [isDark, setIsDark] = useState<boolean>();
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      setTheme(theme as "dark" | "light");
    } else {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    if (theme == "system") {
      const darkModeMql =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

      setIsDark(darkModeMql && darkModeMql.matches ? true : false);
    } else if (theme == "dark") {
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else if (theme == "light") {
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    if (isDark) {
      root.classList.add("dark");
    }
  }, [isDark]);

  return (
    <header className="p-4 bg-secondary  flex justify-between">
      <h1>حسابداری ساختمان</h1>
      <button onClick={() => setTheme(() => (isDark ? "light" : "dark"))}>
        <MorphIcon icon={isDark ? Sun : Moon} />
      </button>
    </header>
  );
}
