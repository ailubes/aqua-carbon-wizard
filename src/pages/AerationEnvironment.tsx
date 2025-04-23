
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Thermometer } from "lucide-react";
import AerationRequirementCalculator from "@/components/aeration/AerationRequirementCalculator";
import EvaporationLossEstimator from "@/components/aeration/EvaporationLossEstimator";

const AerationEnvironment = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full max-w-7xl mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
          Aeration & Environmental Control
        </h1>
        <p className="text-gray-600 mt-1">
          Tools to optimize aeration and manage environmental factors
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 w-full max-w-7xl">
        <AerationRequirementCalculator />
        <EvaporationLossEstimator />
      </div>
    </div>
  );
};

export default AerationEnvironment;
