
import React from "react";
import PondSizeCalculator from "@/components/growth/PondSizeCalculator";
import StockingCalculator from "@/components/growth/StockingCalculator";
import GrowthCalculator from "@/components/growth/GrowthCalculator";
import SurvivalCalculator from "@/components/growth/SurvivalCalculator";
import { GrowthProvider } from "@/contexts/GrowthContext";
import GrowthPrintableTemplate from "@/components/growth/GrowthPrintableTemplate";

const GrowthStocking = () => {
  return (
    <GrowthProvider>
      <div className="flex flex-col items-center justify-center">
        <header className="w-full max-w-7xl mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
            Growth & Stocking Management
          </h1>
          <p className="text-gray-600 mt-1">
            Tools to calculate pond size, stocking density, growth projections, and survival rates
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 w-full max-w-7xl print:!grid-cols-1 print:gap-8">
          <div className="print:hidden">
            <PondSizeCalculator />
            <StockingCalculator />
            <GrowthCalculator />
            <SurvivalCalculator />
          </div>
          <div className="hidden print:block">
            <GrowthPrintableTemplate />
          </div>
        </div>
      </div>
    </GrowthProvider>
  );
};

export default GrowthStocking;
