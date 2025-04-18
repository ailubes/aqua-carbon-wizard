
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthCalculation {
  initialWeight: number;
  days: number;
  adg: number;
  finalWeight: number;
}

const GrowthCalculator = () => {
  const [calculation, setCalculation] = React.useState<GrowthCalculation>({
    initialWeight: 0,
    days: 0,
    adg: 0,
    finalWeight: 0,
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleInputChange = (field: keyof GrowthCalculation, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    const newCalculation = { ...calculation, [field]: numValue };
    newCalculation.finalWeight = newCalculation.initialWeight + (newCalculation.days * newCalculation.adg);
    setCalculation(newCalculation);
  };

  const generateGrowthData = () => {
    const data = [];
    for (let day = 0; day <= calculation.days; day += Math.max(1, Math.floor(calculation.days / 10))) {
      data.push({
        day,
        weight: calculation.initialWeight + (day * calculation.adg)
      });
    }
    // Always include the final day
    if (calculation.days > 0 && data[data.length - 1].day !== calculation.days) {
      data.push({
        day: calculation.days,
        weight: calculation.finalWeight
      });
    }
    return data;
  };

  return (
    <Card className="print:shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-vismar-blue">Growth Projection Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialWeight">Initial Weight (g)</Label>
            <Input
              id="initialWeight"
              type="text"
              value={calculation.initialWeight > 0 ? formatNumber(calculation.initialWeight) : ''}
              onChange={(e) => handleInputChange('initialWeight', e.target.value)}
              placeholder="Enter initial weight"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="days">Days of Culture</Label>
            <Input
              id="days"
              type="text"
              value={calculation.days > 0 ? formatNumber(calculation.days) : ''}
              onChange={(e) => handleInputChange('days', e.target.value)}
              placeholder="Enter days"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adg">ADG (g/day)</Label>
            <Input
              id="adg"
              type="text"
              value={calculation.adg > 0 ? formatNumber(calculation.adg) : ''}
              onChange={(e) => handleInputChange('adg', e.target.value)}
              placeholder="Enter ADG"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Projected Final Weight</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            {formatNumber(calculation.finalWeight)} g
          </p>
          <p className="text-sm text-gray-600 mt-1">Expected weight after {formatNumber(calculation.days)} days</p>
        </div>

        {calculation.days > 0 && calculation.finalWeight > 0 && (
          <div className="mt-6 h-[300px]">
            <h3 className="text-lg font-semibold text-vismar-blue mb-4">Growth Progression</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateGrowthData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#1EAEDB" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GrowthCalculator;
