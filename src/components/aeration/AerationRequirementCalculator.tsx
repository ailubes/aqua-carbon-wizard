import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAerationCalculator, AerationType } from "@/hooks/useAerationCalculator";

const AerationRequirementCalculator = () => {
  const {
    pondArea,
    setPondArea,
    areaUnit,
    setAreaUnit,
    stockingDensity,
    setStockingDensity,
    survivalRate,
    setSurvivalRate,
    avgWeight,
    setAvgWeight,
    aerationType,
    setAerationType,
    installedAeration,
    setInstalledAeration,
    calculations,
    aerationStatus,
  } = useAerationCalculator();

  // --- BEGIN new computations for insufficient aeration ---
  // These calculations are only done when needed; values null unless calculations/install present
  let aerationDeficitKw: number | null = null;
  let aerationDeficitHp: number | null = null;
  let paddlewheelsNeeded: number | null = null;

  if (
    calculations &&
    typeof calculations.requiredKw === "number" &&
    typeof installedAeration === "number" &&
    installedAeration < calculations.requiredKw
  ) {
    aerationDeficitKw = calculations.requiredKw - installedAeration;
    aerationDeficitHp = aerationDeficitKw * 1.34;
    paddlewheelsNeeded = Math.ceil(aerationDeficitHp / 1.5);
  }
  // --- END new computations ---

  return (
    <Card className="border-2 border-vismar-green/20">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <CardTitle className="text-lg font-bold text-vismar-blue">
          Aeration Requirement Calculator
        </CardTitle>
        <CardDescription>
          Calculate required aeration power based on biomass and pond characteristics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pondArea">Pond Area</Label>
            <div className="flex gap-2">
              <Input
                id="pondArea"
                type="number"
                value={pondArea ?? ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? undefined : Number(e.target.value);
                  setPondArea(value);
                }}
                placeholder="Enter pond area"
                className="flex-1"
                min={0}
              />
              <Select value={areaUnit} onValueChange={(value: 'm2' | 'hectares' | 'acres') => setAreaUnit(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m2">m²</SelectItem>
                  <SelectItem value="hectares">hectares</SelectItem>
                  <SelectItem value="acres">acres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stockingDensity">Stocking Density (PL/m²)</Label>
            <Input
              id="stockingDensity"
              type="number"
              value={stockingDensity}
              onChange={(e) => setStockingDensity(Number(e.target.value))}
              placeholder="Enter stocking density"
            />
          </div>

          <div className="space-y-2">
            <Label>Survival Rate (%)</Label>
            <div className="pt-2">
              <Slider
                value={[survivalRate]}
                onValueChange={(value) => setSurvivalRate(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="mt-1 text-sm text-gray-500">{survivalRate}%</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Average Weight at Harvest (g)</Label>
            <div className="pt-2">
              <Slider
                value={[avgWeight]}
                onValueChange={(value) => setAvgWeight(value[0])}
                min={0}
                max={50}
                step={1}
              />
              <div className="mt-1 text-sm text-gray-500">{avgWeight}g</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aerationType">Aeration System Type</Label>
            <Select 
              value={aerationType} 
              onValueChange={(value: string) => setAerationType(value as AerationType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select aeration type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paddlewheel">Paddlewheel</SelectItem>
                <SelectItem value="venturi">Venturi injector</SelectItem>
                <SelectItem value="diffuser">Air diffuser</SelectItem>
                <SelectItem value="mixed">Mixed system</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="installedAeration">Installed Aeration (kW)</Label>
            <Input
              id="installedAeration"
              type="number"
              value={installedAeration ?? ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : Number(e.target.value);
                setInstalledAeration(value);
              }}
              placeholder="Optional"
              min={0}
            />
          </div>
        </div>

        {calculations && (
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-r from-vismar-green/5 to-vismar-blue/5">
                <div className="text-sm text-gray-600">Total Shrimp Stocked</div>
                <div className="text-xl font-bold text-vismar-blue">
                  {calculations.totalShrimp.toLocaleString()} PL
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-vismar-green/5 to-vismar-blue/5">
                <div className="text-sm text-gray-600">Est. Biomass at Harvest</div>
                <div className="text-xl font-bold text-vismar-blue">
                  {calculations.biomass.toLocaleString()} kg
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-vismar-green/5 to-vismar-blue/5">
                <div className="text-sm text-gray-600">Required Aeration</div>
                <div className="text-xl font-bold text-vismar-blue">
                  {calculations.requiredKw.toFixed(1)} kW
                </div>
                <div className="text-sm text-gray-500">
                  {calculations.requiredHp.toFixed(1)} HP
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-vismar-green/5 to-vismar-blue/5">
                <div className="text-sm text-gray-600">System Status</div>
                <div className="text-xl font-bold text-vismar-blue flex items-center gap-2">
                  {aerationStatus.isAdequate ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Sufficient</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span>Insufficient</span>
                    </>
                  )}
                </div>
              </Card>
            </div>

            {!aerationStatus.isAdequate && installedAeration > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Insufficient Aeration</AlertTitle>
                <AlertDescription>
                  Current aeration may be inadequate for projected biomass.<br />
                  Consider increasing power
                  {aerationDeficitKw !== null && aerationDeficitHp !== null && paddlewheelsNeeded !== null ? (
                    <>
                      {" by "}
                      <b>{aerationDeficitKw.toFixed(1)} kW</b> (
                      <b>{aerationDeficitHp.toFixed(1)} HP</b>
                      ), which is equivalent to adding{" "}
                      <b>{paddlewheelsNeeded}</b> paddlewheels {"("}1.5 HP each{")"}.
                    </>
                  ) : (
                    <>.</>
                  )}{" "}
                  Alternatively, consider splitting biomass into multiple ponds.
                </AlertDescription>
              </Alert>
            )}

            {stockingDensity > 60 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>High Stocking Density Warning</AlertTitle>
                <AlertDescription>
                  Stocking exceeds 60 PL/m². Ensure continuous aeration and DO monitoring.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AerationRequirementCalculator;
