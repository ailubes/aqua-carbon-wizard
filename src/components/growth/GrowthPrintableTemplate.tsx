
import React from "react";
import { useGrowth } from "@/contexts/GrowthContext";

const GrowthPrintableTemplate = () => {
  const { pondSize, totalPL, projectedWeight } = useGrowth();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="p-8 font-sans">
      <div className="flex items-center justify-between border-b-2 border-vismar-blue pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-vismar-blue mb-1">Growth & Stocking Management</h1>
          <h2 className="text-xl text-vismar-green">Calculation Results</h2>
        </div>
        <div className="flex flex-col items-end">
          <a 
            href="https://www.vismar-aqua.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src="/lovable-uploads/98e047df-7587-4527-9e1f-c529103e2a20.png" 
              alt="Vismar Aqua Logo" 
              className="h-20 w-auto mb-2" 
            />
          </a>
          <a href="https://www.vismar-aqua.com" className="text-vismar-blue hover:underline">
            www.vismar-aqua.com
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-4">Pond Specifications</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-600">Pond Size</div>
              <div className="text-xl font-medium">{formatNumber(pondSize)} m²</div>
            </div>
            <div>
              <div className="text-gray-600">Total PL Required</div>
              <div className="text-xl font-medium">{formatNumber(totalPL)} PL</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-4">Growth Projections</h3>
          <div>
            <div className="text-gray-600">Projected Final Weight</div>
            <div className="text-xl font-medium">{formatNumber(projectedWeight)} g</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-500 border-t pt-4 flex justify-between">
        <div>Generated on {currentDate}</div>
        <div>© {new Date().getFullYear()} Vismar Aqua - Aquaculture Solutions</div>
      </div>
    </div>
  );
};

export default GrowthPrintableTemplate;
