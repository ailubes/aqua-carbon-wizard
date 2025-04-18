
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGrowth } from "@/contexts/GrowthContext";

const StockingCalculator = () => {
  const { pondSize, setTotalPL } = useGrowth();
  const [plDensity, setPlDensity] = React.useState(0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleInputChange = (value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    setPlDensity(numValue);
    const totalPL = pondSize * numValue;
    setTotalPL(totalPL);
  };

  return (
    <Card className="print:shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-vismar-blue">Stocking Density Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pond Size (m²)</Label>
            <Input
              type="text"
              value={pondSize > 0 ? formatNumber(pondSize) : ''}
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plDensity">PL Density (per m²)</Label>
            <Input
              id="plDensity"
              type="text"
              value={plDensity > 0 ? formatNumber(plDensity) : ''}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter PL density"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Required Postlarvae</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            {formatNumber(pondSize * plDensity)} PL
          </p>
          <p className="text-sm text-gray-600 mt-1">Total PL needed for stocking</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockingCalculator;
