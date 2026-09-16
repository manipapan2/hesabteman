import { cn } from "@/lib/utils.ts";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useId, useState } from "react";
import SheetThemeSelector from "./SheetThemeSelector.tsx";
import Sheet from "./Sheet.tsx";
import IconToggle from "../../IconToggle.tsx";

export default function SheetPreviewSection() {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = "hidden";
    } else {
      // change
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShown]);

  return (
    <>
      {/* <Render ref={sheetRef} /> */}

      <div
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3 bg-transparent opacity-0 backdrop-blur-3xl transition-all lg:pointer-events-auto lg:relative lg:opacity-100",
          isShown && "pointer-events-auto opacity-100",
        )}
      >
        <div className="relative flex h-full w-fit flex-col items-center justify-center rounded-md">
          {/* <img alt="test" src={imageUrl} className="w-full rounded-md" /> */}
          <div className="mb-2 w-full max-w-full">
            <SheetThemeSelector
              colors={[
                {
                  background: "#1C283B",
                  backgroundForeground: "white",
                  secondary: "#2347a9",
                  secondaryForeground: "white",
                },
              ]}
            />
          </div>
          <div className="max-h-4/6 w-full">
            <Sheet />
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsShown((prev) => !prev)}
        className="bg-muted text-muted-foreground fixed bottom-2 left-2 z-10 size-12 rounded-full p-4 lg:hidden"
      >
        <IconToggle
          className="h-full w-full"
          isActive={isShown}
          activeIcon={<EyeOff />}
          notActiveIcon={<Eye />}
        />
      </button>
    </>
  );
}
