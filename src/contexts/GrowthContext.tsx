
import React, { createContext, useContext, useState } from 'react';

interface GrowthContextType {
  pondSize: number;
  setPondSize: (size: number) => void;
  totalPL: number;
  setTotalPL: (pl: number) => void;
  projectedWeight: number;
  setProjectedWeight: (weight: number) => void;
}

const GrowthContext = createContext<GrowthContextType>({
  pondSize: 0,
  setPondSize: () => {},
  totalPL: 0,
  setTotalPL: () => {},
  projectedWeight: 0,
  setProjectedWeight: () => {},
});

export const GrowthProvider = ({ children }: { children: React.ReactNode }) => {
  const [pondSize, setPondSize] = useState(0);
  const [totalPL, setTotalPL] = useState(0);
  const [projectedWeight, setProjectedWeight] = useState(0);

  return (
    <GrowthContext.Provider 
      value={{ 
        pondSize, 
        setPondSize, 
        totalPL, 
        setTotalPL,
        projectedWeight,
        setProjectedWeight
      }}
    >
      {children}
    </GrowthContext.Provider>
  );
};

export const useGrowth = () => useContext(GrowthContext);
