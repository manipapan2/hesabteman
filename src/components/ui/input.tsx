import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils.ts";
import separateNumbers from "@/utils/separateNumbers.ts";

type Props = {
  calssName?: string;
  type?: string;
  inputMode?: string;
  unit?: string;
  isSeparateNumbers?: boolean;
  onValue: (value: string) => void;
} & React.ComponentProps<"input">;

function Input({
  className,
  type,
  inputMode,
  unit,
  isSeparateNumbers,
  onValue,
  ...props
}: Props) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputValue = (value: string) => {
    if (props.maxLength && value.length > props.maxLength) {
      return;
    }

    if (isSeparateNumbers) {
      if (value === "") {
        setInputValue("");
        return;
      }
      const onlyNumbersAndCommaRegex = /^[,\-0-9]*$/;
      if (!value.match(onlyNumbersAndCommaRegex) || value === ",") {
        return;
      }
      const seperatedValue = separateNumbers(value.replaceAll(",", ""));
      setInputValue(seperatedValue);
      onValue(value.replaceAll(",", ""));

      return;
    }

    setInputValue(value);
    onValue(value);
  };

  return (
    <div className="relative">
      <InputPrimitive
        type={isSeparateNumbers ? "text" : type}
        data-slot="input"
        inputMode={
          isSeparateNumbers
            ? "numeric"
            : inputMode
              ? inputMode
              : type === "number"
                ? "numeric"
                : inputMode
        }
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-9 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-lg shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
          unit && "pl-15",
          className,
        )}
        onChange={(e) => {
          handleInputValue(e.target.value);
        }}
        value={inputValue}
        {...props}
      />

      {unit && (
        <span className="bg-muted text-muted-foreground absolute top-1/2 left-0 flex h-full -translate-y-1/2 items-center rounded-l-sm px-4">
          {unit}
        </span>
      )}
    </div>
  );
}

export { Input };
