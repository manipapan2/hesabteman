import { Moon, Sun } from "lucide";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
import AppLogo from "@/assets/images/app-logo.png";

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme as "dark" | "light";
    }

    const darkModeMql =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

    return darkModeMql && darkModeMql.matches ? "dark" : "light";
  });
  const isFirstTimeRef = useRef(true);

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") {
      root.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (isFirstTimeRef.current) {
      isFirstTimeRef.current = false;
    } else if (theme === "dark") {
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <header className="p-4 bg-secondary flex justify-between">
      <div className="flex h-full max-h-full gap-3 items-center">
        <div className="h-8">
          <img
            alt="app logo"
            src={AppLogo}
            className="max-h-full h-full  scale-125 aspect-square"
          />
        </div>
        <h1>حسابتمان</h1>
      </div>
      <button
        onClick={() => setTheme(() => (theme === "dark" ? "light" : "dark"))}
      >
        <MorphIcon icon={theme === "dark" ? Sun : Moon} />
      </button>
    </header>
  );
}
