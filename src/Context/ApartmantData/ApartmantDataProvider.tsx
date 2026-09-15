import type { ApartmantProps } from "@/types/apartmant-data-types";
import { createContext, useState, type ReactNode } from "react";
import ApartmantContext, { initialData } from "./ApartmantContext.ts";

const ApartmantDataProvider = ({ children }: { children: ReactNode }) => {
  const [apartmantData, setApartmantData] =
    useState<ApartmantProps>(initialData);

  return (
    <ApartmantContext value={{ apartmantData, setApartmantData }}>
      {children}
    </ApartmantContext>
  );
};
export default ApartmantDataProvider;
