
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Thermometer } from "lucide-react";
import AerationRequirementCalculator from "@/components/aeration/AerationRequirementCalculator";

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

        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <Thermometer className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Evaporation Loss Estimator</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Estimate water loss due to evaporation based on temperature, humidity, and pond surface area.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AerationEnvironment;
