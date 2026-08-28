import { createContext, useState } from "react";
import DetailSection from "./components/sections/detail";
import "./global.css";
import Header from "./components/header";
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

interface NeighborProps {
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

interface ApartmantContextProps {
  apartmantData: ApartmantProps;
  setApartmantData: React.Dispatch<React.SetStateAction<ApartmantProps>>;
}

const ApartmantContextInitialState: ApartmantContextProps = {
  apartmantData: {
    costs: {
      0: {
        title: "",
        cost: null,
      },
    },
  },
  setApartmantData: () => null,
};

export const ApartmantContext = createContext<ApartmantContextProps>(
  ApartmantContextInitialState,
);

function App() {
  const [apartmantData, setApartmantData] = useState<ApartmantProps>({
    costs: {
      0: {
        title: "",
        cost: null,
      },
    },
  });


  return (
    <ApartmantContext value={{ apartmantData, setApartmantData }}>
      <div className="flex flex-col w-full h-full max-h-full">
        <Header />
        <main className="flex grow overflow-y-auto">
          <div className="w-fit flex flex-col p-4 max-h-full h-full flex-1 overflow-y-auto">
            <DetailSection />
          </div>
        </main>
      </div>
    </ApartmantContext>
  );
}

export default App
