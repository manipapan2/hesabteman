import { createContext, useEffect, useRef, useState } from "react";
import DetailSection from "./components/sections/detail";
import "./global.css";
import NeighborsSection from "./components/sections/neighbors";
import CostSection from "./components/sections/costs";
import Header from "./components/header";
import MoneyLeftSection from "./components/sections/moneyLeft";
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
  const floorRef = useRef<number | undefined | null>(undefined);
  const unitRef = useRef<number | undefined | null>(undefined);

  const calculateNeighbors = () => {
    if (!apartmantData?.floorCount || !apartmantData?.unitCount) {
      if (
        apartmantData.neighbors &&
        Object.keys(apartmantData.neighbors).length > 0
      ) {
        console.log('nisttttt')
        setApartmantData((prevState: ApartmantProps) => {
          const clonedObj = { ...prevState };

          clonedObj["neighbors"] = {};
          return clonedObj;
        });
      }

      floorRef.current = apartmantData.floorCount;
      unitRef.current = apartmantData.unitCount;
      return;
    }

    if (
      apartmantData.floorCount == floorRef.current &&
      apartmantData.unitCount == unitRef.current
    ) {
      return;
    }

    setApartmantData((prevState) => {
      const clonedObj = { ...prevState };
      const neighborsObj: NeighborProps = {};

      for (
        let index = 0;
        index <
        (apartmantData.floorCount as number) *
          (apartmantData.unitCount as number);
        index++
      ) {
        neighborsObj[index] = {
          name: "",
          floor: null,
          unit: null,
          hasPaidFee: true,
        };
      }

      clonedObj["neighbors"] = neighborsObj;
      return clonedObj;
    });

    floorRef.current = apartmantData.floorCount;
    unitRef.current = apartmantData.unitCount;
  };

  useEffect(() => {
    calculateNeighbors();
  }, [apartmantData]);

  return (
    <ApartmantContext value={{ apartmantData, setApartmantData }}>
      <div className="flex flex-col w-full h-full max-h-full">
        <Header />
        <main className="flex grow overflow-y-auto">
          <div className="w-fit flex flex-col p-4 max-h-full h-full gap-4 flex-1 overflow-y-auto">
            <DetailSection />
            <NeighborsSection />
            <CostSection />
            <MoneyLeftSection />
          </div>
        </main>
      </div>
    </ApartmantContext>
  );
}

export default App
