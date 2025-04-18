
import React from "react";
import PondSizeCalculator from "@/components/growth/PondSizeCalculator";
import StockingCalculator from "@/components/growth/StockingCalculator";
import GrowthCalculator from "@/components/growth/GrowthCalculator";
import SurvivalCalculator from "@/components/growth/SurvivalCalculator";
import { GrowthProvider } from "@/contexts/GrowthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Printer } from "lucide-react";
import { useGrowth } from "@/contexts/GrowthContext";
import GrowthPrintableTemplate from "@/components/growth/GrowthPrintableTemplate";

const GrowthStocking = () => {
  const navigate = useNavigate();
  const { pondSize, totalPL, projectedWeight } = useGrowth();

  const handlePrint = () => {
    window.print();
  };

  const handleNext = () => {
    navigate('/feed');
  };

  return (
    <GrowthProvider>
      <div className="flex flex-col items-center justify-center">
        <header className="w-full max-w-7xl mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
              Growth & Stocking Management
            </h1>
            <p className="text-gray-600 mt-1">
              Tools to calculate pond size, stocking density, growth projections, and survival rates
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline" className="print:hidden">
              <Printer className="mr-2 h-4 w-4" />
              Print Results
            </Button>
            <Button onClick={handleNext} className="print:hidden">
              Next: Feed Management
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
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
