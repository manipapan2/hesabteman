import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";
import SeparateNumbers from "@/utils/separateNumbers";

type Props = {
  calssName?: string;
  type?: string;
  inputMode?: string;
  unit?: string;
  separateNumbers?: boolean;
  onValue: (value: string) => void;
} & React.ComponentProps<"input">;

function Input({
  className,
  type,
  inputMode,
  unit,
  separateNumbers,
  onValue,
  ...props
}: Props) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputValue = (value: string) => {
    if (separateNumbers) {
      if(value == '') {
        setInputValue('')
        return
      }
      const onlyNumbersAndCommaRegex = /^[0-9-,]*$/;
      if (!value.match(onlyNumbersAndCommaRegex) || value == ',') {
        return;
      }
      const seperatedValue = SeparateNumbers(value.replaceAll(",", ""));
      setInputValue(seperatedValue);
      onValue(value);

      return;
    }

    setInputValue(value);
    onValue(value);
  };

  return (
    <div className="relative">
      <InputPrimitive
        type={separateNumbers ? "text" : type}
        data-slot="input"
        inputMode={
          separateNumbers
            ? "numeric"
            : inputMode
              ? inputMode
              : type == "number"
                ? "numeric"
                : inputMode
        }
        className={cn(
          "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 pl-15 text-lg shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        onChange={(e) => {
          handleInputValue(e.target.value);
        }}
        value={inputValue}
        {...props}
      />

      {unit && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 rounded-l-sm bg-muted text-muted-foreground h-full px-4">
          {unit}
        </span>
      )}
    </div>
  );
}

export { Input };
