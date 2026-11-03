import type { SheetSettingProps } from "@/types/sheet-setting-types";
import { createContext } from "react";

export const initialData: SheetSettingProps = {
  showSheetTitle: true,
  defaultColumns: {
    neigbors: {
      name: true,
      unit: true,
      feeStatus: true,
    },
    profit: {
      balance: true,
      sumOfCosts: true,
    },
  },
};

interface SheetSettingContextProps {
  sheetSetting: SheetSettingProps;
  setSheetSetting: React.Dispatch<React.SetStateAction<SheetSettingProps>>;
}

const SheetSettingContextInitialState: SheetSettingContextProps = {
  sheetSetting: initialData,
  setSheetSetting: () => null,
};

const SheetSettingContext = createContext<SheetSettingContextProps>(
  SheetSettingContextInitialState,
);

export default SheetSettingContext;
