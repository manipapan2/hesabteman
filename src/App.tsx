import BaseInfoSection from "./components/sections/BaseInfoSection.tsx";
import "./global.css";
import NeighborStatusSection from "./components/sections/NeighborStatusSection.tsx";
import CostSection from "./components/sections/CostSection.tsx";
import SheetPreviewSection from "./components/sections/preview/SheetPreviewSection.tsx";
import ProfitSection from "./components/sections/ProfitSection.tsx";
import Header from "./components/Header.tsx";
import ApartmantDataProvider from "./Context/ApartmantData/ApartmantDataProvider.tsx";

function App() {
  return (
    <ApartmantDataProvider>
      <div className="flex flex-col w-full h-full max-h-full">
        <Header />
        <main className="flex grow overflow-y-auto">
          <div className="max-w-3/5 lg:w-full lg:p-4">
            <SheetPreviewSection />
          </div>
          <div className="w-fit flex flex-col p-4 max-h-full h-full gap-4 flex-1 overflow-y-auto">
            <BaseInfoSection />
            <NeighborStatusSection />
            <CostSection />
            <ProfitSection />
          </div>
        </main>
      </div>
    </ApartmantDataProvider>
  );
}

export default App;
