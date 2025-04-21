
import React from "react";
import WaterExchangeCalculator from "@/components/water/WaterExchangeCalculator";

const WaterExchange = () => (
  <div className="flex flex-col items-center justify-center">
    <header className="w-full max-w-2xl mb-4">
      <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
        Water Exchange Calculator
      </h1>
      <p className="text-gray-600 mt-1">
        Estimate optimal water exchange for shrimp ponds or tanks.
      </p>
    </header>
    <div className="w-full max-w-2xl">
      <WaterExchangeCalculator />
    </div>
  </div>
);

export default WaterExchange;
