
import React from "react";
import PondSizeCalculator from "@/components/growth/PondSizeCalculator";
import StockingCalculator from "@/components/growth/StockingCalculator";
import GrowthCalculator from "@/components/growth/GrowthCalculator";
import SurvivalCalculator from "@/components/growth/SurvivalCalculator";
import { GrowthProvider, useGrowth } from "@/contexts/GrowthContext";
import GrowthPrintableTemplate from "@/components/growth/GrowthPrintableTemplate";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GrowthStockingContent = () => {
  const navigate = useNavigate();
  const { pondSize, totalPL, projectedWeight } = useGrowth();
  const [daysOfCulture, setDaysOfCulture] = React.useState<number>(0);

  const handleNext = () => {
    navigate("/feed", {
      state: {
        biomass: projectedWeight,
        daysOfCulture: daysOfCulture,
        plCount: totalPL,
        pondSize,
      },
    });
  };

  return (
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
          <GrowthCalculator onDaysChange={setDaysOfCulture} />
          <SurvivalCalculator />
        </div>
        <div className="hidden print:block">
          <GrowthPrintableTemplate />
        </div>
      </div>

      <div className="w-full max-w-7xl flex justify-between items-center mt-8">
        <div className="text-sm text-gray-600">
          {totalPL > 0 && projectedWeight > 0 && daysOfCulture > 0 && (
            <span>Ready: {totalPL.toLocaleString()} PL, {projectedWeight.toFixed(1)}g target weight, {daysOfCulture} days</span>
          )}
        </div>
        <Button 
          variant="default" 
          onClick={handleNext}
          disabled={!totalPL || !projectedWeight || !daysOfCulture}
        >
          Next: Feed Management
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const GrowthStocking = () => {
  return (
    <GrowthProvider>
      <GrowthStockingContent />
    </GrowthProvider>
  );
};

export default GrowthStocking;
