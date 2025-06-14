
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { plStages } from "@/data/plStages";
import { geneticLines } from "@/data/geneticLines";
import { useGrowth } from "@/contexts/GrowthContext";

interface GrowthCalculatorProps {
  onDaysChange?: (days: number) => void;
}

const GrowthCalculator: React.FC<GrowthCalculatorProps> = ({ onDaysChange }) => {
  const { setProjectedWeight } = useGrowth();
  const [plStage, setPlStage] = React.useState('');
  const [days, setDays] = React.useState(0);
  const [geneticLine, setGeneticLine] = React.useState('');
  const [finalWeight, setFinalWeight] = React.useState(0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 3,
      minimumFractionDigits: 0,
    }).format(num);
  };

  React.useEffect(() => {
    const selectedPL = plStages.find(pl => pl.stage === plStage);
    const selectedLine = geneticLines.find(line => line.name === geneticLine);
    
    if (selectedPL && selectedLine && days > 0) {
      const projectedWeight = selectedPL.weight + (days * selectedLine.avgAdg);
      setFinalWeight(projectedWeight);
      setProjectedWeight(projectedWeight);
    }
  }, [plStage, days, geneticLine, setProjectedWeight]);

  React.useEffect(() => {
    if (onDaysChange && days > 0) {
      onDaysChange(days);
    }
  }, [days, onDaysChange]);

  const handleDaysChange = (value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    setDays(numValue);
  };

  const generateGrowthData = () => {
    const selectedPL = plStages.find(pl => pl.stage === plStage);
    const selectedLine = geneticLines.find(line => line.name === geneticLine);
    
    if (!selectedPL || !selectedLine) return [];

    const data = [];
    for (let day = 0; day <= days; day += Math.max(1, Math.floor(days / 10))) {
      data.push({
        day,
        weight: selectedPL.weight + (day * selectedLine.avgAdg)
      });
    }
    if (days > 0 && data[data.length - 1].day !== days) {
      data.push({
        day: days,
        weight: finalWeight
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
            <Label>PL Stage</Label>
            <Select onValueChange={setPlStage} value={plStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select PL stage" />
              </SelectTrigger>
              <SelectContent>
                {plStages.map((pl) => (
                  <SelectItem key={pl.stage} value={pl.stage}>
                    {pl.stage} ({pl.age} days, {formatNumber(pl.weight)}g)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="days">Days of Culture</Label>
            <Input
              id="days"
              type="text"
              value={days > 0 ? formatNumber(days) : ''}
              onChange={(e) => handleDaysChange(e.target.value)}
              placeholder="Enter days"
            />
          </div>

          <div className="space-y-2">
            <Label>Genetic Line</Label>
            <Select onValueChange={setGeneticLine} value={geneticLine}>
              <SelectTrigger>
                <SelectValue placeholder="Select genetic line" />
              </SelectTrigger>
              <SelectContent>
                {geneticLines.map((line) => (
                  <SelectItem key={line.name} value={line.name}>
                    {line.name} (ADG: {line.adgRange})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Projected Final Weight</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            {formatNumber(finalWeight)} g
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Expected weight after {formatNumber(days)} days
          </p>
        </div>

        {days > 0 && finalWeight > 0 && (
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
