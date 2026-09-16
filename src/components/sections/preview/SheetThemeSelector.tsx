import { cn } from "@/lib/utils.ts";
import { useEffect, useState } from "react";

interface props {
  themes: ThemeProps[];
}

interface ThemeProps {
  background: string;
  backgroundForeground: string;
  secondary: string;
  secondaryForeground: string;
}
const SheetThemeSelector = ({ themes }: props) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeProps>(themes[0]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sheet-background",
      selectedTheme.background,
    );
    document.documentElement.style.setProperty(
      "--sheet-background-foreground",
      selectedTheme.backgroundForeground,
    );
    document.documentElement.style.setProperty(
      "--sheet-secondary",
      selectedTheme.secondary,
    );
    document.documentElement.style.setProperty(
      "--sheet-secondary-foreground",
      selectedTheme.secondaryForeground,
    );
  }, [selectedTheme]);

  return (
    <div
      dir="ltr"
      className="flex max-w-full justify-start gap-4 overflow-hidden overflow-x-auto"
    >
      {themes.map((theme: ThemeProps, index) => (
        <Item
          key={index}
          onClick={() => setSelectedTheme(theme)}
          selectedTheme={selectedTheme}
          colors={theme}
        />
      ))}
    </div>
  );
};

interface ItemProps {
  colors: ThemeProps;
  selectedTheme: ThemeProps;
  onClick: (colors: any) => void;
}

const Item = ({ colors, selectedTheme, onClick }: ItemProps) => {
  return (
    <button aria-label="select theme" className="p-1" onClick={onClick}>
      <div
        className={cn(
          "outline-muted relative m-1 aspect-square min-w-9 overflow-hidden rounded-full outline-3 outline-offset-3 lg:outline-offset-4",
          JSON.stringify(selectedTheme) === JSON.stringify(colors) &&
            "outline-primary",
        )}
      >
        <div className="absolute top-1/2 left-1/2 flex h-full w-full -translate-1/2 -rotate-45 items-center justify-center">
          <div
            className="flex aspect-square min-w-[200%]"
            style={{ backgroundColor: colors.background }}
          />
          <div
            className="flex aspect-square min-w-[200%]"
            style={{ backgroundColor: colors.secondary }}
          />
        </div>
      </div>
    </button>
  );
};

export default SheetThemeSelector;
