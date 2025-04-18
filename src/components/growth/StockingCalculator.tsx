
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface StockingCalculation {
  pondSize: number;
  plDensity: number;
  totalPL: number;
}

const StockingCalculator = () => {
  const [calculation, setCalculation] = React.useState<StockingCalculation>({
    pondSize: 0,
    plDensity: 0,
    totalPL: 0,
  });
  const { toast } = useToast();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleInputChange = (field: keyof StockingCalculation, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    const newCalculation = { ...calculation, [field]: numValue };
    newCalculation.totalPL = newCalculation.pondSize * newCalculation.plDensity;
    setCalculation(newCalculation);
  };

  return (
    <Card className="print:shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-vismar-blue">Stocking Density Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pondSize">Pond Size (m²)</Label>
            <Input
              id="pondSize"
              type="text"
              value={calculation.pondSize > 0 ? formatNumber(calculation.pondSize) : ''}
              onChange={(e) => handleInputChange('pondSize', e.target.value)}
              placeholder="Enter pond size"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plDensity">PL Density (per m²)</Label>
            <Input
              id="plDensity"
              type="text"
              value={calculation.plDensity > 0 ? formatNumber(calculation.plDensity) : ''}
              onChange={(e) => handleInputChange('plDensity', e.target.value)}
              placeholder="Enter PL density"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Required Postlarvae</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            {formatNumber(calculation.totalPL)} PL
          </p>
          <p className="text-sm text-gray-600 mt-1">Total PL needed for stocking</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockingCalculator;
