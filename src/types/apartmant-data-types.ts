export interface ApartmantProps {
  year?: string | null;
  month?: string | null;
  fee?: number | null;
  floorCount?: number | null;
  unitCount?: number | null;
  neighbors: NeighborProps[] | [];
  costs: CostProps[] | [];
  profit: ProfitProps[] | [];
}

export interface NeighborProps {
  id: number;
  name: string | null;
  floor: number | null;
  unit: number | null;
  hasPaidFee: boolean;
}

export interface CostProps {
  id: number;
  title: string | null;
  cost: number | null;
}

export type ProfitProps = CostProps;
