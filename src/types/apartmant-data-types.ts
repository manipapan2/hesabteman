export interface ApartmantProps {
  year?: string | null;
  month?: string | null;
  fee?: number | null;
  floorCount?: number | null;
  unitCount?: number | null;
  neighbors?: NeighborProps;
  costs?: CostProps;
  moneyLeft?: MoneyLeftProps;
}

export interface NeighborProps {
  [key: number | string]: {
    name: string | null;
    floor: number | null;
    unit: number | null;
    hasPaidFee: boolean;
  };
}

export interface CostProps {
  [key: number | string]: {
    title: string | null;
    cost: number | null;
  };
}

export type MoneyLeftProps = CostProps;
