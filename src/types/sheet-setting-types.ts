export interface SheetSettingProps {
  showSheetTitle: boolean;
  defaultColumns: {
    neigbors: NeighborsDefaultColumns;
    profit: ProfitDefaultColumns;
  };
}

export interface NeighborsDefaultColumns {
  name: boolean;
  unit: boolean;
  feeStatus: boolean;
}

export interface ProfitDefaultColumns {
  balance: boolean;
  sumOfCosts: boolean;
}
