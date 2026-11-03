import { cn } from "@/lib/utils";

interface props {
  children: React.ReactNode;
  className?: string;
  hasDefaultMargin?: boolean;
}

const InputTitle = (props: props) => {
  const { children, className, hasDefaultMargin = true, ...restProps } = props;

  return (
    <h2
      className={cn(
        "text-foreground text-xl",
        { "mb-2": hasDefaultMargin },
        className,
      )}

      {...restProps}
    >
      {children}
    </h2>
  );
};

export default InputTitle;
