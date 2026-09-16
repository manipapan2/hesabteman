import BaseInfoSection from "./components/sections/BaseInfoSection.tsx";
import "./global.css";
import NeighborStatusSection from "./components/sections/NeighborStatusSection.tsx";
import CostSection from "./components/sections/CostSection.tsx";
import SheetPreviewSection from "./components/sections/preview/SheetPreviewSection.tsx";
import ProfitSection from "./components/sections/ProfitSection.tsx";
import Header from "./components/Header.tsx";
import ApartmantDataProvider from "./contexts/ApartmantData/ApartmantDataProvider.tsx";

function App() {
  return (
    <ApartmantDataProvider>
      <div className="flex h-full max-h-full w-full flex-col">
        <Header />
        <main className="flex grow overflow-y-auto">
          <div className="max-w-3/5 lg:w-full lg:p-4">
            <SheetPreviewSection />
          </div>
          <div className="flex h-full max-h-full w-fit flex-1 flex-col gap-4 overflow-y-auto p-4">
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
