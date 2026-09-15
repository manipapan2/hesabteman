import { useEffect, useRef } from "react";
import DetailSection from "./components/sections/detail.tsx";
import "./global.css";
import NeighborsSection from "./components/sections/neighbors.tsx";
import CostSection from "./components/sections/costs.tsx";
import Result from "./components/result/result.tsx";
import Header from "./components/header.tsx";
import MoneyLeftSection from "./components/sections/moneyLeft.tsx";
import ApartmantDataProvider from "./Context/ApartmantData/ApartmantDataProvider.tsx";

function App() {
  return (
    <ApartmantDataProvider>
      <div className="flex flex-col w-full h-full max-h-full">
        <Header />
        <main className="flex grow overflow-y-auto">
          <div className="max-w-3/5 lg:w-full lg:p-4">
            <Result />
          </div>
          <div className="w-fit flex flex-col p-4 max-h-full h-full gap-4 flex-1 overflow-y-auto">
            <DetailSection />
            <NeighborsSection />
            <CostSection />
            <MoneyLeftSection />
          </div>
        </main>
      </div>
    </ApartmantDataProvider>
  );
}

export default App;
