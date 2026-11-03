import type { SheetSettingProps } from "@/types/sheet-setting-types.ts";
import { useState, type ReactNode } from "react";
import SheetSettingContext, { initialData } from "./SheetSettingContext.ts";

const SheetSettingProvider = ({ children }: { children: ReactNode }) => {
  const [sheetSetting, setSheetSetting] =
    useState<SheetSettingProps>(initialData);

  return (
    <SheetSettingContext value={{ sheetSetting, setSheetSetting }}>
      {children}
    </SheetSettingContext>
  );
};
export default SheetSettingProvider;
