import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type props = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"section">;

const Section = (props: props) => {
  const { children, className, ...restProps } = props;

  return (
    <section
      className={cn(
        "bg-accent flex flex-col gap-2 rounded-md py-3 px-2",
        className,
      )}
      {...restProps}
    >
      {children}
    </section>
  );
};

export default Section;
