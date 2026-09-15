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
      <div className="w-full h-full relative">
        <i
          className={cn(
            "absolute left-1/2 top-1/2 -translate-1/2 transition-all",
            isActive ? "opacity-100 scale-100" : "opacity-0 scale-50 -z-10",
          )}
        >
          {activeIcon}
        </i>
        <i
          className={cn(
            "absolute left-1/2 top-1/2 -translate-1/2 transition-all",
            isActive ? "opacity-0 scale-50 -z-10" : "opacity-100 scale-100",
          )}
        >
          {notActiveIcon}
        </i>
      </div>
    </div>
  );
};

export default IconToggle;
