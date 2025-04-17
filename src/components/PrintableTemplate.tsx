
import React from "react";
import { carbonSources } from "@/data/carbonSources";

interface PrintableTemplateProps {
  tankVolume: string;
  tanConcentration: string;
  selectedSource: string;
  result: number | null;
  getSelectedCarbonSource: () => (typeof carbonSources[0]) | undefined;
  formatNumber: (num: number) => string;
}

const PrintableTemplate = ({
  tankVolume,
  tanConcentration,
  selectedSource,
  result,
  getSelectedCarbonSource,
  formatNumber
}: PrintableTemplateProps) => {
  const currentDate = new Date().toLocaleDateString();
  const selectedCarbonSource = getSelectedCarbonSource();
  
  return (
    <div id="printable-template" className="p-8 font-sans">
      <div className="flex items-center justify-between border-b-2 border-vismar-blue pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-vismar-blue mb-1">Ammonia Reduction Calculator</h1>
          <h2 className="text-xl text-vismar-green">Calculation Results</h2>
        </div>
        <div className="flex flex-col items-end">
          <img 
            src="/lovable-uploads/98e047df-7587-4527-9e1f-c529103e2a20.png" 
            alt="Vismar Aqua Logo" 
            className="h-20 w-auto mb-2" 
          />
          <a href="https://www.vismar-aqua.com" className="text-vismar-blue hover:underline">www.vismar-aqua.com</a>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 text-vismar-blue">Input Parameters:</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="font-medium text-gray-600">Tank/Pond Volume</div>
            <div className="text-xl">{tankVolume} Liters</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="font-medium text-gray-600">TAN Concentration</div>
            <div className="text-xl">{tanConcentration} ppm</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md col-span-2">
            <div className="font-medium text-gray-600">Carbon Source</div>
            <div className="text-xl">{selectedSource} ({(selectedCarbonSource?.availableCarbon || 0) * 100}% available carbon)</div>
          </div>
        </div>
      </div>
      
      <div className="mb-8 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 p-6 rounded-md border border-vismar-green/30">
        <h3 className="text-xl font-bold mb-2 text-center">Calculation Result</h3>
        <div className="text-center">
          <div className="text-3xl font-bold text-vismar-blue">
            {result !== null ? `${formatNumber(result)} grams` : "Not calculated"}
          </div>
          <div className="text-gray-600 mt-1">of {selectedSource} needed</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-8">
        <h3 className="font-medium mb-2">Calculation Method:</h3>
        <p className="text-gray-700 mb-2">
          Organic Carbon Needed (grams) = (Tank volume in liters) × (TAN in ppm) × 6 × (% Available Carbon from chosen source) ÷ 1000
        </p>
        {selectedCarbonSource?.notes && (
          <div className="mt-3 text-sm italic">
            <span className="font-medium">Note about {selectedSource}:</span> {selectedCarbonSource.notes}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 border-t pt-4 mt-8 flex justify-between">
        <div>Generated on {currentDate}</div>
        <div>© {new Date().getFullYear()} Vismar Aqua - Aquaculture Solutions</div>
      </div>
    </div>
  );
};

export default PrintableTemplate;
