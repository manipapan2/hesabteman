import { cn } from "@/lib/utils.ts";
import { Download, Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useId, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import ColorSelector from "./ColorSelector.tsx";
import Sheet from "./Sheet.tsx";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";
import IconToggle from "../../IconToggle.tsx";

export default function SheetPreviewSection() {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;
  const [isShown, setIsShown] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const darkSpanId = useId();
  const lighSpanId = useId();
  const darkSpan = document.getElementById(darkSpanId);
  const lightSpan = document.getElementById(lighSpanId);

  const convertToImage = () => {
    htmlToImage.toPng(sheetRef.current!).then((imageURL: string) => {
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = `فاکتور ساختمان ${apartmantData.month} ${apartmantData.year}`;
      link.click();
    });
  };

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
          "fixed top-0 left-0 z-10 w-full h-full bg-transparent backdrop-blur-3xl flex flex-col gap-3 justify-center items-center transition-all opacity-0 pointer-events-none lg:relative lg:opacity-100 lg:pointer-events-auto",
          isShown && "opacity-100 pointer-events-auto",
        )}
      >
        <div className="rounded-md w-fit relative flex justify-center items-center scale-40 lg:scale-60">
          {/* <img alt="test" src={imageUrl} className="w-full rounded-md" /> */}
          <span id={darkSpanId} className="dark hidden" />
          <span id={lighSpanId} className="light hidden" />
          <div className="absolute left-0 -top-36 lg:-top-28 max-w-11/12 w-11/12 p-2">
            {darkSpan && lightSpan && (
              <ColorSelector
                colors={[
                  {
                    background: window
                      .getComputedStyle(darkSpan)
                      .getPropertyValue("--background"),
                    backgroundForeground: window
                      .getComputedStyle(darkSpan)
                      .getPropertyValue("--background-foreground"),
                    secondary: window
                      .getComputedStyle(darkSpan)
                      .getPropertyValue("--secondary"),
                    secondaryForeground: window
                      .getComputedStyle(darkSpan)
                      .getPropertyValue("--secondary-foreground"),
                  },
                  {
                    background: window
                      .getComputedStyle(lightSpan)
                      .getPropertyValue("--background"),
                    backgroundForeground: window
                      .getComputedStyle(lightSpan)
                      .getPropertyValue("--background-foreground"),
                    secondary: window
                      .getComputedStyle(lightSpan)
                      .getPropertyValue("--secondary"),
                    secondaryForeground: window
                      .getComputedStyle(lightSpan)
                      .getPropertyValue("--secondary-foreground"),
                  },
                  {
                    background: "#1C283B",
                    backgroundForeground: "white",
                    secondary: "#2347a9",
                    secondaryForeground: "white",
                  },
                ]}
              />
            )}
          </div>
          <Sheet ref={sheetRef} />
          <button
            onClick={() => convertToImage()}
            className="p-3 rounded-full bg-primary text-primary-foreground absolute top-0 right-0 scale-200 lg:scale-170 lg:right-5 lg:top-5 hover:cursor-pointer"
          >
            <Download />
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsShown((prev) => !prev)}
        className="bg-muted size-12 text-muted-foreground z-10 rounded-full p-4 fixed left-2 bottom-2 lg:hidden"
      >
        <IconToggle
          className="w-full h-full"
          isActive={isShown}
          activeIcon={<EyeOff />}
          notActiveIcon={<Eye />}
        />
      </button>
    </>
  );
}
