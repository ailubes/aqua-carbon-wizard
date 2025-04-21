
import React from "react";
import { Card } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import WaterExchangeCalculator from "@/components/water/WaterExchangeCalculator";
import AlkalinityAdjustmentCalculator from "@/components/water/AlkalinityAdjustmentCalculator";

const WaterQuality = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full max-w-7xl mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
          Water Quality Management
        </h1>
        <p className="text-gray-600 mt-1">
          Tools to maintain optimal water conditions for shrimp farming
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
        <WaterExchangeCalculator />
        <AlkalinityAdjustmentCalculator />
      </div>
    </div>
  );
};

export default WaterQuality;
