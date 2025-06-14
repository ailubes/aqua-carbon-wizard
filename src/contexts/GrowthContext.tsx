
import React, { createContext, useContext, useState } from 'react';

interface GrowthContextType {
  pondSize: number;
  setPondSize: (size: number) => void;
  totalPL: number;
  setTotalPL: (pl: number) => void;
  projectedWeight: number;
  setProjectedWeight: (weight: number) => void;
  biomass: number;
  survivalRate: number;
  setSurvivalRate: (rate: number) => void;
}

const GrowthContext = createContext<GrowthContextType>({
  pondSize: 0,
  setPondSize: () => {},
  totalPL: 0,
  setTotalPL: () => {},
  projectedWeight: 0,
  setProjectedWeight: () => {},
  biomass: 0,
  survivalRate: 80,
  setSurvivalRate: () => {},
});

export const GrowthProvider = ({ children }: { children: React.ReactNode }) => {
  const [pondSize, setPondSize] = useState(0);
  const [totalPL, setTotalPL] = useState(0);
  const [projectedWeight, setProjectedWeight] = useState(0);
  const [survivalRate, setSurvivalRate] = useState(80);

  // Calculate biomass based on survival rate and projected weight
  const biomass = (totalPL * (survivalRate / 100) * projectedWeight) / 1000; // Convert to kg

  return (
    <GrowthContext.Provider 
      value={{ 
        pondSize, 
        setPondSize, 
        totalPL, 
        setTotalPL,
        projectedWeight,
        setProjectedWeight,
        biomass,
        survivalRate,
        setSurvivalRate
      }}
    >
      {children}
    </GrowthContext.Provider>
  );
};

export const useGrowth = () => useContext(GrowthContext);
