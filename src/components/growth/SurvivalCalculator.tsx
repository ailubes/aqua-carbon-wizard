
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SurvivalCalculation {
  initialCount: number;
  finalCount: number;
  survivalRate: number;
}

const SurvivalCalculator = () => {
  const [calculation, setCalculation] = React.useState<SurvivalCalculation>({
    initialCount: 0,
    finalCount: 0,
    survivalRate: 0,
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleInputChange = (field: keyof SurvivalCalculation, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    const newCalculation = { ...calculation, [field]: numValue };
    
    if (newCalculation.initialCount > 0) {
      newCalculation.survivalRate = (newCalculation.finalCount / newCalculation.initialCount) * 100;
    }
    
    setCalculation(newCalculation);
  };

  return (
    <Card className="print:shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-vismar-blue">Survival Rate Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialCount">Initial Shrimp Count</Label>
            <Input
              id="initialCount"
              type="text"
              value={calculation.initialCount > 0 ? formatNumber(calculation.initialCount) : ''}
              onChange={(e) => handleInputChange('initialCount', e.target.value)}
              placeholder="Enter initial count"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="finalCount">Final Shrimp Count</Label>
            <Input
              id="finalCount"
              type="text"
              value={calculation.finalCount > 0 ? formatNumber(calculation.finalCount) : ''}
              onChange={(e) => handleInputChange('finalCount', e.target.value)}
              placeholder="Enter final count"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Survival Rate</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            {formatNumber(calculation.survivalRate)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Percentage of surviving shrimp</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurvivalCalculator;
