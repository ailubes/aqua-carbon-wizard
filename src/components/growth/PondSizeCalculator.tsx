
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface PondSize {
  length: number;
  width: number;
  area: number;
}

const PondSizeCalculator = () => {
  const [dimensions, setDimensions] = React.useState<PondSize>({
    length: 0,
    width: 0,
    area: 0,
  });
  const { toast } = useToast();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleInputChange = (field: keyof PondSize, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    const newDimensions = { ...dimensions, [field]: numValue };
    newDimensions.area = newDimensions.length * newDimensions.width;
    setDimensions(newDimensions);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="print:shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-vismar-blue">Pond Size Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Length (meters)</Label>
            <Input
              id="length"
              type="text"
              value={dimensions.length > 0 ? formatNumber(dimensions.length) : ''}
              onChange={(e) => handleInputChange('length', e.target.value)}
              placeholder="Enter length"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (meters)</Label>
            <Input
              id="width"
              type="text"
              value={dimensions.width > 0 ? formatNumber(dimensions.width) : ''}
              onChange={(e) => handleInputChange('width', e.target.value)}
              placeholder="Enter width"
            />
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Result</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            {formatNumber(dimensions.area)} m²
          </p>
          <p className="text-sm text-gray-600 mt-1">Total Pond Area</p>
        </div>

        <button
          onClick={handlePrint}
          className="mt-4 print:hidden px-4 py-2 bg-vismar-blue text-white rounded-md hover:bg-vismar-dark-blue transition-colors"
        >
          Print Results
        </button>
      </CardContent>
    </Card>
  );
};

export default PondSizeCalculator;
