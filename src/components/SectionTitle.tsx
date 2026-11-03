import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type props = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"h2">;

const SectionTitle = (props: props) => {
  const { children, className, ...restProps } = props;

  return (
    <h2
      className={cn("text-foreground mb-2 text-2xl", className)}
      {...restProps}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
