
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { carbonSources } from "@/data/carbonSources";
import { Calculator, Droplets, FlaskConical, Info, Printer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import PrintableTemplate from "@/components/PrintableTemplate";

const AmmoniaCalculator = () => {
  const [tankVolume, setTankVolume] = useState<string>("");
  const [tanConcentration, setTanConcentration] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>(carbonSources[0].name);
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const printTemplateRef = useRef<HTMLDivElement>(null);

  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });

  const parseNumberInput = (value: string): number => {
    // Remove all non-digit and non-decimal characters
    const cleanedValue = value.replace(/[^\d.]/g, '');
    return parseFloat(cleanedValue);
  };

  const handleTankVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseNumberInput(rawValue);
    
    // Handle different input scenarios
    const formattedValue = isNaN(numericValue) 
      ? '' 
      : numberFormatter.format(numericValue);
    
    setTankVolume(formattedValue);
  };

  const handleTanConcentrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseNumberInput(rawValue);
    
    const formattedValue = isNaN(numericValue) 
      ? '' 
      : numberFormatter.format(numericValue);
    
    setTanConcentration(formattedValue);
  };

  const validateInputs = (): boolean => {
    const parsedTankVolume = parseNumberInput(tankVolume);
    const parsedTanConcentration = parseNumberInput(tanConcentration);

    if (!parsedTankVolume || parsedTankVolume <= 0) {
      toast.error("Please enter a valid tank volume (must be greater than 0)");
      return false;
    }
    if (!parsedTanConcentration || parsedTanConcentration <= 0) {
      toast.error("Please enter a valid TAN concentration (must be greater than 0)");
      return false;
    }
    return true;
  };

  const calculateCarbonNeeded = () => {
    if (!validateInputs()) return;
    
    const volume = parseNumberInput(tankVolume);
    const tan = parseNumberInput(tanConcentration);
    
    const selectedCarbonSource = carbonSources.find(source => source.name === selectedSource);
    if (!selectedCarbonSource) {
      toast.error("Please select a carbon source");
      return;
    }

    const availableCarbon = selectedCarbonSource.availableCarbon;

    // Calculate base formula result (without dividing by available carbon)
    const carbonBase = volume * tan * 6 / 1000;

    // Calculate total carbon source needed by dividing base result by available carbon percentage
    const carbonNeeded = carbonBase / availableCarbon;
    setResult(carbonNeeded);
    setIsCalculated(true);
    toast.success("Calculation completed!");
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      // Display in tons if over 1000 kg (1,000,000 grams)
      return `${numberFormatter.format(num / 1000000)} tons`;
    } else if (num >= 1000) {
      // Display in kg if over 1000 grams
      return `${numberFormatter.format(num / 1000)} kg`;
    } else {
      // Display in grams for smaller amounts
      return `${numberFormatter.format(num)} grams`;
    }
  };

  const getSelectedCarbonSource = () => {
    return carbonSources.find(source => source.name === selectedSource);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-template');
    const originalBody = document.body.innerHTML;
    
    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalBody;
      
      // Reattach event listeners after printing
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      toast.error("Print template not found");
    }
  };
  
  const resetForm = () => {
    setTankVolume("");
    setTanConcentration("");
    setSelectedSource(carbonSources[0].name);
    setResult(null);
    setIsCalculated(false);
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
            <a 
              href="https://www.vismar-aqua.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/98e047df-7587-4527-9e1f-c529103e2a20.png" 
                alt="Vismar Aqua Logo" 
                className="h-16 w-auto" 
              />
            </a>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Droplets className="mr-2 h-4 w-4 text-vismar-blue" />
                <Label htmlFor="tankVolume" className="text-base">Tank/Pond Volume (Liters)</Label>
              </div>
              <Input 
                id="tankVolume" 
                placeholder="Enter tank volume" 
                value={tankVolume} 
                onChange={handleTankVolumeChange} 
                className="border-vismar-blue/30 focus:border-vismar-blue" 
                type="text" 
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
                onChange={handleTanConcentrationChange} 
                className="border-vismar-green/30 focus:border-vismar-green" 
                type="text" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="carbonSource" className="text-base">Carbon Source</Label>
            <Select value={selectedSource} onValueChange={value => setSelectedSource(value)}>
              <SelectTrigger className="w-full border-vismar-blue/30">
                <SelectValue placeholder="Select a carbon source" />
              </SelectTrigger>
              <SelectContent>
                {carbonSources.map(source => <SelectItem key={source.name} value={source.name}>
                    {source.name} ({(source.availableCarbon * 100).toFixed(1)}% carbon)
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <Button onClick={calculateCarbonNeeded} className="bg-vismar-green hover:bg-vismar-green/80 text-white">
              <Calculator className="mr-2 h-4 w-4" /> Calculate
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-vismar-blue text-vismar-blue hover:bg-vismar-blue/10">
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
                  <strong>Carbon Source Needed:</strong> {formatNumber(result)}
                </div>
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex justify-end">
              <Button onClick={handlePrint} variant="outline" className="border-vismar-blue text-vismar-blue hover:bg-vismar-blue/10">
                <Printer className="mr-2 h-4 w-4" /> Print Results
              </Button>
            </div>
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
                {getSelectedCarbonSource()?.notes && <p className="font-medium">{selectedSource} note: {getSelectedCarbonSource()?.notes}</p>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>

      <div className="hidden">
        <PrintableTemplate 
          tankVolume={tankVolume}
          tanConcentration={tanConcentration}
          selectedSource={selectedSource}
          result={result}
          getSelectedCarbonSource={getSelectedCarbonSource}
          formatNumber={formatNumber}
        />
      </div>
    </div>
  );
};

export default AmmoniaCalculator;
