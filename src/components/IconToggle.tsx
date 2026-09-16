import { cn } from "@/lib/utils.ts";
import type { ReactNode } from "react";

interface props {
  isActive: boolean;
  activeIcon: ReactNode;
  notActiveIcon: ReactNode;
  className?: string;
}

const IconToggle = ({
  isActive,
  activeIcon,
  notActiveIcon,
  className,
}: props) => {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <i
          className={cn(
            "absolute top-1/2 left-1/2 -translate-1/2 transition-all",
            isActive ? "scale-100 opacity-100" : "-z-10 scale-0 opacity-0",
          )}
        >
          {activeIcon}
        </i>
        <i
          className={cn(
            "absolute top-1/2 left-1/2 -translate-1/2 transition-all",
            isActive ? "-z-10 scale-0 opacity-0" : "scale-100 opacity-100",
          )}
        >
          {notActiveIcon}
        </i>
      </div>
    </div>
  );
};

export default IconToggle;
