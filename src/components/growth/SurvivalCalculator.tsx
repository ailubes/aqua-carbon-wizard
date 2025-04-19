
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGrowth } from "@/contexts/GrowthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Printer } from "lucide-react";

const SurvivalCalculator = () => {
  const navigate = useNavigate();
  const { totalPL, projectedWeight } = useGrowth();
  const [harvestedTotal, setHarvestedTotal] = React.useState(0);
  const [finalCount, setFinalCount] = React.useState(0);
  const [survivalRate, setSurvivalRate] = React.useState(0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  React.useEffect(() => {
    if (projectedWeight > 0 && harvestedTotal > 0) {
      const estimatedCount = (harvestedTotal * 1000) / projectedWeight; // Convert kg to g
      setFinalCount(estimatedCount);
      if (totalPL > 0) {
        setSurvivalRate((estimatedCount / totalPL) * 100);
      }
    }
  }, [harvestedTotal, projectedWeight, totalPL]);

  const handlePrint = () => {
    window.print();
  };

  const handleNext = () => {
    // Navigate to feed management with initial data
    navigate('/feed', {
      state: {
        biomass: harvestedTotal, // Pass the harvested total as initial biomass
        feedingPeriod: 30, // Default feeding period
      }
    });
  };

  return (
    <Card className="print:shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-vismar-blue">Survival Rate Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Initial Shrimp Count</Label>
            <Input
              type="text"
              value={totalPL > 0 ? formatNumber(totalPL) : ''}
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="harvestedTotal">Harvested Total (kg)</Label>
            <Input
              id="harvestedTotal"
              type="text"
              value={harvestedTotal > 0 ? formatNumber(harvestedTotal) : ''}
              onChange={(e) => setHarvestedTotal(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
              placeholder="Enter harvested total in kg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-vismar-blue mb-2">Estimated Final Count</h3>
              <p className="text-2xl font-bold text-vismar-blue">
                {formatNumber(finalCount)} shrimp
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-vismar-blue mb-2">Survival Rate</h3>
              <p className="text-2xl font-bold text-vismar-blue">
                {formatNumber(survivalRate)}%
              </p>
              <p className="text-sm text-gray-600 mt-1">Percentage of surviving shrimp</p>
            </div>
          </div>
        </div>

        {harvestedTotal > 0 && (
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Button 
              onClick={handlePrint} 
              variant="outline" 
              className="w-full md:w-auto"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Results
            </Button>
            <Button 
              onClick={handleNext} 
              className="w-full md:w-auto"
            >
              Next: Feed Management
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SurvivalCalculator;
