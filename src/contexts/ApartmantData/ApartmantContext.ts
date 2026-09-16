import type { ApartmantProps } from "@/types/apartmant-data-types";
import { createContext } from "react";

export const initialData = {
  costs: {
    0: {
      title: "",
      cost: null,
    },
  },
};

interface ApartmantContextProps {
  apartmantData: ApartmantProps;
  setApartmantData: React.Dispatch<React.SetStateAction<ApartmantProps>>;
}

const ApartmantContextInitialState: ApartmantContextProps = {
  apartmantData: initialData,
  setApartmantData: () => null,
};

const ApartmantContext = createContext<ApartmantContextProps>(
  ApartmantContextInitialState,
);

export default ApartmantContext;
