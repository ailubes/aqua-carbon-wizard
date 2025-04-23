import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGrowth } from './GrowthContext';
import { useFeed } from './FeedContext';

interface CostContextType {
  // PL costs
  plCount: number;
  setPlCount: (count: number) => void;
  plUnitPrice: number;
  setPlUnitPrice: (price: number) => void;
  plTotalCost: number;
  
  // Feed costs
  feedAmount: number;
  setFeedAmount: (amount: number) => void;
  feedUnitPrice: number;
  setFeedUnitPrice: (price: number) => void;
  feedTotalCost: number;
  
  // Energy costs
  aerationPower: number;
  setAerationPower: (power: number) => void;
  operationHours: number;
  setOperationHours: (hours: number) => void;
  energyUnitPrice: number;
  setEnergyUnitPrice: (price: number) => void;
  cultureDuration: number;
  setCultureDuration: (days: number) => void;
  energyTotalCost: number;
  
  // Labor costs
  monthlyLaborCost: number;
  setMonthlyLaborCost: (cost: number) => void;
  workerCount: number;
  setWorkerCount: (count: number) => void;
  laborTotalCost: number;
  
  // Other costs
  otherCosts: number;
  setOtherCosts: (costs: number) => void;
  
  // Final calculations
  totalCost: number;
  costPerKg: number;
  currency: string;
  setCurrency: (currency: string) => void;
  
  // Profit estimation
  sellingPrice: number;
  setSellingPrice: (price: number) => void;
  grossRevenue: number;
  profit: number;
}

const CostContext = createContext<CostContextType>({
  plCount: 0,
  setPlCount: () => {},
  plUnitPrice: 0,
  setPlUnitPrice: () => {},
  plTotalCost: 0,
  
  feedAmount: 0,
  setFeedAmount: () => {},
  feedUnitPrice: 0,
  setFeedUnitPrice: () => {},
  feedTotalCost: 0,
  
  aerationPower: 0,
  setAerationPower: () => {},
  operationHours: 0,
  setOperationHours: () => {},
  energyUnitPrice: 0,
  setEnergyUnitPrice: () => {},
  cultureDuration: 0,
  setCultureDuration: () => {},
  energyTotalCost: 0,
  
  monthlyLaborCost: 0,
  setMonthlyLaborCost: () => {},
  workerCount: 0,
  setWorkerCount: () => {},
  laborTotalCost: 0,
  
  otherCosts: 0,
  setOtherCosts: () => {},
  
  totalCost: 0,
  costPerKg: 0,
  currency: "USD",
  setCurrency: () => {},
  
  sellingPrice: 0,
  setSellingPrice: () => {},
  grossRevenue: 0,
  profit: 0
});

export const CostProvider = ({ children }: { children: React.ReactNode }) => {
  // Import data from other contexts
  const { totalPL, projectedWeight } = useGrowth();
  const { totalFeedRequired } = useFeed();
  
  // PL costs
  const [plCount, setPlCount] = useState(totalPL || 0);
  const [plUnitPrice, setPlUnitPrice] = useState(0);
  
  // Feed costs
  const [feedAmount, setFeedAmount] = useState(totalFeedRequired || 0);
  const [feedUnitPrice, setFeedUnitPrice] = useState(0);
  
  // Energy costs
  const [aerationPower, setAerationPower] = useState(0);
  const [operationHours, setOperationHours] = useState(16); // Default: 16 hours per day
  const [energyUnitPrice, setEnergyUnitPrice] = useState(0);
  const [cultureDuration, setCultureDuration] = useState(120); // Default: 120 days
  
  // Labor costs
  const [monthlyLaborCost, setMonthlyLaborCost] = useState(0);
  const [workerCount, setWorkerCount] = useState(1);
  
  // Other costs
  const [otherCosts, setOtherCosts] = useState(0);
  
  // Settings
  const [currency, setCurrency] = useState("USD");
  
  // Profit estimation
  const [sellingPrice, setSellingPrice] = useState(0);
  
  // Derived calculations
  const plTotalCost = plCount * plUnitPrice / 1000;
  const feedTotalCost = feedAmount * feedUnitPrice;
  const energyTotalCost = aerationPower * operationHours * cultureDuration * energyUnitPrice / 1000;
  const laborTotalCost = monthlyLaborCost * workerCount * (cultureDuration / 30);
  
  const totalCost = plTotalCost + feedTotalCost + energyTotalCost + laborTotalCost + otherCosts;
  const costPerKg = projectedWeight > 0 ? totalCost / projectedWeight : 0;
  
  const grossRevenue = projectedWeight * sellingPrice;
  const profit = grossRevenue - totalCost;
  
  // Update the PL count when totalPL changes
  useEffect(() => {
    if (totalPL > 0) {
      setPlCount(totalPL);
    }
  }, [totalPL]);
  
  // Update the feed amount when totalFeedRequired changes
  useEffect(() => {
    if (totalFeedRequired > 0) {
      setFeedAmount(totalFeedRequired);
    }
  }, [totalFeedRequired]);

  return (
    <CostContext.Provider
      value={{
        plCount,
        setPlCount,
        plUnitPrice,
        setPlUnitPrice,
        plTotalCost,
        
        feedAmount,
        setFeedAmount,
        feedUnitPrice,
        setFeedUnitPrice,
        feedTotalCost,
        
        aerationPower,
        setAerationPower,
        operationHours,
        setOperationHours,
        energyUnitPrice,
        setEnergyUnitPrice,
        cultureDuration,
        setCultureDuration,
        energyTotalCost,
        
        monthlyLaborCost,
        setMonthlyLaborCost,
        workerCount,
        setWorkerCount,
        laborTotalCost,
        
        otherCosts,
        setOtherCosts,
        
        totalCost,
        costPerKg,
        currency,
        setCurrency,
        
        sellingPrice,
        setSellingPrice,
        grossRevenue,
        profit
      }}
    >
      {children}
    </CostContext.Provider>
  );
};

export const useCost = () => useContext(CostContext);
