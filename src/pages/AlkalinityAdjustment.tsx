
import React from "react";
import AlkalinityAdjustmentCalculator from "@/components/water/AlkalinityAdjustmentCalculator";

const AlkalinityAdjustment = () => (
  <div className="flex flex-col items-center justify-center">
    <header className="w-full max-w-2xl mb-4">
      <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
        Alkalinity Adjustment Calculator
      </h1>
      <p className="text-gray-600 mt-1">
        Find out how much buffer to safely raise pond alkalinity.
      </p>
    </header>
    <div className="w-full max-w-2xl">
      <AlkalinityAdjustmentCalculator />
    </div>
  </div>
);

export default AlkalinityAdjustment;
