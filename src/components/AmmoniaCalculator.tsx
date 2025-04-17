
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { carbonSources } from "@/data/carbonSources";
import { Calculator, Droplets, FlaskConical, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const AmmoniaCalculator = () => {
  const [tankVolume, setTankVolume] = useState<string>("");
  const [tanConcentration, setTanConcentration] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>(carbonSources[0].name);
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const validateInputs = (): boolean => {
    if (!tankVolume || isNaN(Number(tankVolume)) || Number(tankVolume) <= 0) {
      toast.error("Please enter a valid tank volume (must be greater than 0)");
      return false;
    }

    if (!tanConcentration || isNaN(Number(tanConcentration)) || Number(tanConcentration) <= 0) {
      toast.error("Please enter a valid TAN concentration (must be greater than 0)");
      return false;
    }

    return true;
  };

  const calculateCarbonNeeded = () => {
    if (!validateInputs()) return;

    const selectedCarbonSource = carbonSources.find(source => source.name === selectedSource);
    
    if (!selectedCarbonSource) {
      toast.error("Please select a carbon source");
      return;
    }

    // Organic Carbon Needed (grams) = (Tank volume in liters) × (TAN in ppm) × 6 × (% Available Carbon from chosen source) ÷ 1000
    const volume = parseFloat(tankVolume);
    const tan = parseFloat(tanConcentration);
    const availableCarbon = selectedCarbonSource.availableCarbon;

    // Calculate base formula result (without dividing by available carbon)
    const carbonBase = (volume * tan * 6) / 1000;
    
    // Calculate total carbon source needed by dividing base result by available carbon percentage
    const carbonNeeded = carbonBase / availableCarbon;
    
    setResult(carbonNeeded);
    setIsCalculated(true);
    toast.success("Calculation completed!");
  };

  const resetForm = () => {
    setTankVolume("");
    setTanConcentration("");
    setSelectedSource(carbonSources[0].name);
    setResult(null);
    setIsCalculated(false);
  };

  const formatNumber = (num: number): string => {
    return num.toFixed(2);
  };

  const getSelectedCarbonSource = () => {
    return carbonSources.find(source => source.name === selectedSource);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="border-2 border-vismar-green/20">
        <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-vismar-blue">Ammonia Reduction Calculator</CardTitle>
              <CardDescription>Calculate organic carbon needed to reduce ammonia (TAN) levels</CardDescription>
            </div>
            <img 
              src="/lovable-uploads/98e047df-7587-4527-9e1f-c529103e2a20.png" 
              alt="Vismar Aqua Logo" 
              className="h-16 w-auto"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Droplets className="mr-2 h-4 w-4 text-vismar-blue" />
                <Label htmlFor="tankVolume" className="text-base">Tank Volume (Liters)</Label>
              </div>
              <Input
                id="tankVolume"
                placeholder="Enter tank volume"
                value={tankVolume}
                onChange={(e) => setTankVolume(e.target.value)}
                className="border-vismar-blue/30 focus:border-vismar-blue"
                type="number"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <FlaskConical className="mr-2 h-4 w-4 text-vismar-green" />
                <Label htmlFor="tanConcentration" className="text-base">TAN Concentration (ppm)</Label>
              </div>
              <Input
                id="tanConcentration"
                placeholder="Enter TAN concentration"
                value={tanConcentration}
                onChange={(e) => setTanConcentration(e.target.value)}
                className="border-vismar-green/30 focus:border-vismar-green"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="carbonSource" className="text-base">Carbon Source</Label>
            <Select
              value={selectedSource}
              onValueChange={(value) => setSelectedSource(value)}
            >
              <SelectTrigger className="w-full border-vismar-blue/30">
                <SelectValue placeholder="Select a carbon source" />
              </SelectTrigger>
              <SelectContent>
                {carbonSources.map((source) => (
                  <SelectItem key={source.name} value={source.name}>
                    {source.name} ({(source.availableCarbon * 100).toFixed(1)}% carbon)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <Button 
              onClick={calculateCarbonNeeded} 
              className="bg-vismar-green hover:bg-vismar-green/80 text-white"
            >
              <Calculator className="mr-2 h-4 w-4" /> Calculate
            </Button>
            <Button 
              onClick={resetForm} 
              variant="outline"
              className="border-vismar-blue text-vismar-blue hover:bg-vismar-blue/10"
            >
              Reset
            </Button>
          </div>
        </CardContent>

        {isCalculated && result !== null && (
          <div className="px-6 pb-6">
            <Alert className="bg-gradient-to-r from-vismar-green/20 to-vismar-blue/20 border border-vismar-green/50">
              <div className="text-lg font-medium mb-2">Results:</div>
              <AlertDescription className="text-base space-y-2">
                <div><strong>Carbon Source:</strong> {selectedSource}</div>
                <div><strong>Available Carbon:</strong> {(getSelectedCarbonSource()?.availableCarbon || 0) * 100}%</div>
                <div className="text-xl font-bold text-vismar-blue">
                  <strong>Carbon Source Needed:</strong> {formatNumber(result)} grams
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <CardFooter className="flex flex-col space-y-2 bg-gray-50 rounded-b-lg">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="notes">
              <AccordionTrigger className="text-vismar-blue flex items-center">
                <Info className="mr-2 h-4 w-4" /> Educational Notes
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-2">
                <p>
                  This calculator uses the formula: Organic Carbon Needed (grams) = 
                  (Tank volume in liters) × (TAN in ppm) × 6 × (% Available Carbon from chosen source) ÷ 1000
                </p>
                <p>
                  Total Ammonia Nitrogen (TAN) refers to the sum of both ionized (NH4⁺) and unionized (NH3) forms
                  of ammonia in water. Adding carbon sources helps stimulate heterotrophic bacteria, which
                  can consume ammonia as they grow.
                </p>
                {getSelectedCarbonSource()?.notes && (
                  <p className="font-medium">{selectedSource} note: {getSelectedCarbonSource()?.notes}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AmmoniaCalculator;
