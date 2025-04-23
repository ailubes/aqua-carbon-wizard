
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Thermometer, Wind, Droplets, CloudSunRain, Calendar, SquareM, Gauge, Droplet } from "lucide-react";
import { useEvaporationLossCalculator, REGIONAL_PRESETS } from "@/hooks/useEvaporationLossCalculator";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const AREA_UNITS = [
  { label: "m²", value: "m2", factor: 1 },
  { label: "hectares", value: "hectare", factor: 10000 },
  { label: "acres", value: "acre", factor: 4046.86 }
];
const OPTIMAL_SALINITY = 30; // ppt
const SALINITY_MIN = 28;
const SALINITY_MAX = 32;

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

  // Surface Area units
  const [areaUnit, setAreaUnit] = useState<"m2" | "hectare" | "acre">("m2");
  const [areaInput, setAreaInput] = useState<string>("");

  // Salinity dilution
  const [showSalinity, setShowSalinity] = useState(false);
  const [pondDepth, setPondDepth] = useState<string>("");
  const [currentSalinity, setCurrentSalinity] = useState<string>("");

  // Sync input and calculator's pond area in m2
  React.useEffect(() => {
    if (areaInput === "") {
      setPondArea("");
    } else {
      // Convert entered value to m2 for state
      const numVal = parseFloat(areaInput);
      if (!isNaN(numVal) && numVal >= 0) {
        const selected = AREA_UNITS.find(u => u.value === areaUnit);
        if (selected) setPondArea((numVal * selected.factor).toString());
      }
    }
  }, [areaInput, areaUnit, setPondArea]);

  // Format numbers
  const formatNumber = (value: number, decimals = 1) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

  // Chart data
  const getChartData = () => {
    if (!calculations) return [];
    if (showWeeklyMonthly) {
      return [
        { name: "Daily", value: calculations.waterLoss },
        { name: "Weekly", value: calculations.weeklyWaterLoss },
        { name: "Monthly", value: calculations.monthlyWaterLoss }
      ];
    } else {
      return [{ name: "Daily", value: calculations.waterLoss }];
    }
  };
  const chartData = getChartData();

  // Preset handler
  const handlePresetClick = (preset: typeof REGIONAL_PRESETS[number]) => {
    applyPreset(preset);
    toast({
      title: `Applied ${preset.name} preset`,
      description: `Temperature: ${preset.temperature}°C, Humidity: ${preset.humidity}%, Wind Speed: ${preset.windSpeed} m/s`
    });
  };

  // Area input handler (no negatives, allow empty)
  const handleAreaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) setAreaInput(val);
  };

  // Salinity input handler
  const handleSalinityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) setCurrentSalinity(val);
  };

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) setPondDepth(val);
  };

  // Salinity dilution advisory/result
  const getSalinityRecommendation = () => {
    const pondAreaNum = parseFloat(pondArea); // always in m²
    const depthNum = parseFloat(pondDepth);
    const salinityNum = parseFloat(currentSalinity);
    if (
      isNaN(pondAreaNum) ||
      pondAreaNum <= 0 ||
      isNaN(depthNum) ||
      depthNum <= 0 ||
      isNaN(salinityNum) ||
      salinityNum <= OPTIMAL_SALINITY
    ) {
      return null;
    }
    // V1 = pondArea * depth (m³) -- total volume
    // To dilute from salinityNum to OPTIMAL_SALINITY:
    // FreshWaterToAdd (L) = V1 * ((salinityNum - OPTIMAL_SALINITY) / OPTIMAL_SALINITY) * 1000 (m³ to liters)
    const totalVol = pondAreaNum * depthNum; // in m³
    const delta = salinityNum - OPTIMAL_SALINITY;
    const waterToAdd_m3 = totalVol * (delta / OPTIMAL_SALINITY);
    const waterToAdd_L = waterToAdd_m3 * 1000;
    return {
      waterToAdd_L,
      waterToAdd_m3,
      text: `To reduce salinity from ${formatNumber(salinityNum, 1)} ppt to ${OPTIMAL_SALINITY} ppt, add ~${formatNumber(waterToAdd_L, 0)} L (${formatNumber(waterToAdd_m3, 1)} m³) of freshwater.`
    };
  };

  // Reset area input if unit changes
  React.useEffect(() => {
    setAreaInput("");
  }, [areaUnit]);

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
          {/* Inputs Column */}
          <div className="space-y-6">
            {/* Pond Area + Unit */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SquareM className="h-5 w-5 text-vismar-green" />
                <Label htmlFor="pondAreaInput">Pond Surface Area</Label>
              </div>
              <div className="flex gap-2">
                <Input
                  id="pondAreaInput"
                  placeholder="Enter number"
                  inputMode="decimal"
                  type="text"
                  value={areaInput}
                  onChange={handleAreaInput}
                  className="w-full"
                  min={0}
                  pattern="\d*\.?\d*"
                  autoComplete="off"
                />
                <Select
                  value={areaUnit}
                  onValueChange={v => setAreaUnit(v as "m2" | "hectare" | "acre")}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AREA_UNITS.map(unit =>
                      <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
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
                onValueChange={value => setTemperature(value[0])}
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
                onValueChange={value => setHumidity(value[0])}
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
                onValueChange={value => setWindSpeed(value[0])}
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

            {/* Salinity dilution toggle */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-vismar-green" />
                <Label htmlFor="toggle-salinity">Adjust for Salinity</Label>
              </div>
              <Switch
                id="toggle-salinity"
                checked={showSalinity}
                onCheckedChange={setShowSalinity}
              />
            </div>

            {/* Salinity dilution inputs */}
            {showSalinity && (
              <div className="space-y-2 border border-vismar-green/20 rounded-md p-3 bg-vismar-green/5">
                <div className="flex gap-2 items-center">
                  <Label htmlFor="salinity">Current Salinity</Label>
                  <Input
                    id="salinity"
                    value={currentSalinity}
                    onChange={handleSalinityInput}
                    placeholder="e.g. 35"
                    className="w-24"
                    type="text"
                    inputMode="decimal"
                    min={0}
                  />
                  <span className="text-sm text-gray-500">ppt</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Label htmlFor="depth">Avg. Pond Depth</Label>
                  <Input
                    id="depth"
                    value={pondDepth}
                    onChange={handleDepthChange}
                    placeholder="e.g. 1.2"
                    className="w-24"
                    type="text"
                    inputMode="decimal"
                    min={0}
                  />
                  <span className="text-sm text-gray-500">m</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Target for vannamei: {SALINITY_MIN}–{SALINITY_MAX} ppt
                </div>
                {/* Recommendation result */}
                {(() => {
                  const result = getSalinityRecommendation();
                  if (!result) {
                    // No need to show when not required
                    return null;
                  }
                  return (
                    <Alert className="bg-blue-50 border-blue-200 mt-3">
                      <AlertTitle className="text-blue-800">Freshwater Dilution Recommendation</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        {result.text}
                      </AlertDescription>
                    </Alert>
                  );
                })()}
              </div>
            )}

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
                      Consider partial shading, windbreaks, or automated top-up systems. Water loss may increase salinity.<br />
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
