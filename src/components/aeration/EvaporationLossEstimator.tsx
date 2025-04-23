
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Thermometer, Wind, Droplets, CloudSunRain, Calendar, SquareM } from "lucide-react";
import { useEvaporationLossCalculator, REGIONAL_PRESETS } from "@/hooks/useEvaporationLossCalculator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";

const EvaporationLossEstimator = () => {
  const {
    pondArea,
    setPondArea,
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    windSpeed,
    setWindSpeed,
    evaporationCoefficient,
    setEvaporationCoefficient,
    showWeeklyMonthly,
    setShowWeeklyMonthly,
    calculations,
    applyPreset,
    REGIONAL_PRESETS
  } = useEvaporationLossCalculator();
  
  const { toast } = useToast();
  
  const form = useForm();

  // Format numbers for display
  const formatNumber = (value: number, decimals = 1) => {
    return value.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  // Handle pond area input
  const handlePondAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or positive numbers
    if (value === "" || (Number(value) >= 0)) {
      setPondArea(value);
    }
  };

  // Prepare chart data
  const getChartData = () => {
    if (!calculations) return [];
    
    if (showWeeklyMonthly) {
      return [
        { name: 'Daily', value: calculations.waterLoss },
        { name: 'Weekly', value: calculations.weeklyWaterLoss },
        { name: 'Monthly', value: calculations.monthlyWaterLoss }
      ];
    } else {
      return [{ name: 'Daily', value: calculations.waterLoss }];
    }
  };

  const chartData = getChartData();
  
  // Handle preset selection
  const handlePresetClick = (preset: typeof REGIONAL_PRESETS[number]) => {
    applyPreset(preset);
    toast({
      title: `Applied ${preset.name} preset`,
      description: `Temperature: ${preset.temperature}°C, Humidity: ${preset.humidity}%, Wind Speed: ${preset.windSpeed} m/s`,
    });
  };

  return (
    <Card className="border-2 border-vismar-green/20">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <div className="flex items-center mb-2">
          <CloudSunRain className="h-6 w-6 text-vismar-green mr-2" />
          <CardTitle className="text-lg font-bold text-vismar-blue">Evaporation Loss Estimator</CardTitle>
        </div>
        <CardDescription>
          Calculate daily water loss from shrimp ponds due to evaporation
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            {/* Pond Size Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SquareM className="h-5 w-5 text-vismar-green" />
                <Label htmlFor="pondArea">Pond Surface Area</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="pondArea"
                  placeholder="Enter pond area"
                  type="number"
                  value={pondArea}
                  onChange={handlePondAreaChange}
                  className="w-full"
                />
                <span className="text-sm font-medium text-gray-500">m²</span>
              </div>
            </div>
            
            {/* Temperature Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-vismar-green" />
                  <Label>Average Daily Temperature</Label>
                </div>
                <span className="font-medium text-vismar-blue">{temperature}°C</span>
              </div>
              <Slider
                value={[temperature]}
                min={20}
                max={45}
                step={1}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>20°C</span>
                <span>45°C</span>
              </div>
            </div>
            
            {/* Humidity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-vismar-green" />
                  <Label>Average Relative Humidity</Label>
                </div>
                <span className="font-medium text-vismar-blue">{humidity}%</span>
              </div>
              <Slider
                value={[humidity]}
                min={10}
                max={100}
                step={1}
                onValueChange={(value) => setHumidity(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10%</span>
                <span>100%</span>
              </div>
            </div>
            
            {/* Wind Speed Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-vismar-green" />
                  <Label>Wind Speed</Label>
                </div>
                <span className="font-medium text-vismar-blue">{windSpeed} m/s</span>
              </div>
              <Slider
                value={[windSpeed]}
                min={0}
                max={10}
                step={0.1}
                onValueChange={(value) => setWindSpeed(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 m/s</span>
                <span>10 m/s</span>
              </div>
            </div>
            
            {/* Regional Presets */}
            <div className="space-y-2">
              <Label>Regional Presets</Label>
              <div className="flex flex-wrap gap-2">
                {REGIONAL_PRESETS.map((preset) => (
                  <Button 
                    key={preset.name} 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Show Weekly/Monthly Toggle */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-vismar-green" />
                <Label htmlFor="weekly-monthly">Show Weekly/Monthly Projection</Label>
              </div>
              <Switch
                id="weekly-monthly"
                checked={showWeeklyMonthly}
                onCheckedChange={setShowWeeklyMonthly}
              />
            </div>
          </div>
          
          {/* Results Section */}
          <div className="space-y-6">
            {calculations ? (
              <>
                <div className="rounded-lg bg-vismar-blue/5 p-4 border border-vismar-blue/20">
                  <h3 className="text-lg font-medium text-vismar-blue mb-3">Evaporation Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Evaporation Rate:</span>
                      <span className="font-medium">{formatNumber(calculations.evaporationRate)} mm/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Water Loss:</span>
                      <span className="font-medium">
                        {calculations.waterLoss > 1000 
                          ? `${formatNumber(calculations.waterLossCubicMeters)} m³/day`
                          : `${formatNumber(calculations.waterLoss)} L/day`}
                      </span>
                    </div>
                    
                    {showWeeklyMonthly && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weekly Water Loss:</span>
                          <span className="font-medium">
                            {calculations.weeklyWaterLoss > 1000 
                              ? `${formatNumber(calculations.weeklyWaterLoss / 1000)} m³/week`
                              : `${formatNumber(calculations.weeklyWaterLoss)} L/week`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Water Loss:</span>
                          <span className="font-medium">
                            {calculations.monthlyWaterLoss > 1000 
                              ? `${formatNumber(calculations.monthlyWaterLoss / 1000)} m³/month`
                              : `${formatNumber(calculations.monthlyWaterLoss)} L/month`}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Evaporation Chart */}
                <div className="h-64">
                  <ChartContainer
                    config={{
                      waterLoss: { color: "#0ea5e9" },
                    }}
                  >
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        label={{
                          value: calculations.waterLoss > 1000 ? 'Water Loss (m³)' : 'Water Loss (L)',
                          angle: -90,
                          position: 'insideLeft',
                          style: { textAnchor: 'middle' },
                        }}
                        tickFormatter={(value) => {
                          if (calculations.waterLoss > 1000) {
                            return (value / 1000).toFixed(1);
                          }
                          return value.toFixed(0);
                        }}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            const value = data.value;
                            const formattedValue = value > 1000 
                              ? `${(value / 1000).toFixed(2)} m³` 
                              : `${value.toFixed(0)} L`;
                            
                            return (
                              <div className="bg-white p-2 border rounded shadow">
                                <p>{`${data.name}: ${formattedValue}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar dataKey="value" fill="#0ea5e9" name="Water Loss" />
                    </BarChart>
                  </ChartContainer>
                </div>
                
                {/* Advisory Messages */}
                {calculations.isHighEvaporation && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTitle className="text-amber-800">High Evaporation Rate Detected</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      Consider partial shading, windbreaks, or automated top-up systems. Water loss may increase salinity.
                      Monitor regularly and plan fresh water inputs.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-gray-500">
                <div className="text-center">
                  <CloudSunRain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-medium text-lg mb-1">No Results Available</h3>
                  <p>Enter pond area to calculate evaporation loss</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      {calculations && (
        <CardFooter className="bg-gray-50 border-t">
          <div className="flex flex-col w-full text-sm text-gray-600">
            <p>
              <strong>Note:</strong> Calculations use a simplified evaporation model suitable for shrimp aquaculture.
              Actual water loss may vary based on local conditions.
            </p>
            <div className="mt-2 flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                className="text-vismar-blue"
                onClick={() => {
                  // Navigate to water exchange calculator
                  window.location.href = "/water/exchange";
                }}
              >
                Link to Water Exchange Calculator
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default EvaporationLossEstimator;
