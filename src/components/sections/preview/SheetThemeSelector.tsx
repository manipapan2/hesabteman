import { cn } from "@/lib/utils.ts";
import { useEffect, useRef, useState } from "react";

interface props {
  colors: ColorProps[];
}

interface ColorProps {
  background: string;
  backgroundForeground: string;
  secondary: string;
  secondaryForeground: string;
}
export default function SheetThemeSelector({ colors }: props) {
  const [selectedColors, setSelectedColors] = useState<ColorProps>(colors[0]);
  const isFirstTimeRef = useRef(true);

  useEffect(() => {
    if (isFirstTimeRef.current) {
      isFirstTimeRef.current = false;
    } else {
      document.documentElement.style.setProperty(
        "--result-background",
        selectedColors.background,
      );
      document.documentElement.style.setProperty(
        "--result-background-foreground",
        selectedColors.backgroundForeground,
      );
      document.documentElement.style.setProperty(
        "--result-secondary",
        selectedColors.secondary,
      );
      document.documentElement.style.setProperty(
        "--result-secondary-foreground",
        selectedColors.secondaryForeground,
      );
    }
  }, [selectedColors]);

  return (
    <div
      dir="ltr"
      className="flex max-w-full justify-start gap-4 overflow-hidden overflow-x-auto"
    >
      {colors.map((element, index) => (
        <Item
          key={index}
          onClick={() => setSelectedColors(element)}
          selectedColors={selectedColors}
          colors={element}
        />
      ))}
    </div>
  );
}

interface ItemProps {
  colors: ColorProps;
  selectedColors: ColorProps;
  onClick: (colors: any) => void;
}

const Item = ({ colors, selectedColors, onClick }: ItemProps) => {
  return (
    <button aria-label="select theme" className="p-1" onClick={onClick}>
      <div
        className={cn(
          "outline-muted relative m-1 aspect-square min-w-9 overflow-hidden rounded-full outline-3 outline-offset-3 lg:outline-offset-4",
          JSON.stringify(selectedColors) === JSON.stringify(colors) &&
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
