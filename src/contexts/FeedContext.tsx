
import React, { createContext, useContext, useState } from 'react';

interface FeedContextType {
  totalBiomass: number;
  setTotalBiomass: (biomass: number) => void;
  fcr: number;
  setFcr: (fcr: number) => void;
  feedingPeriod: number;
  setFeedingPeriod: (days: number) => void;
  totalFeedRequired: number;
  setTotalFeedRequired: (feed: number) => void;
}

const FeedContext = createContext<FeedContextType>({
  totalBiomass: 0,
  setTotalBiomass: () => {},
  fcr: 1.2,
  setFcr: () => {},
  feedingPeriod: 0,
  setFeedingPeriod: () => {},
  totalFeedRequired: 0,
  setTotalFeedRequired: () => {},
});

export const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalBiomass, setTotalBiomass] = useState(0);
  const [fcr, setFcr] = useState(1.2);
  const [feedingPeriod, setFeedingPeriod] = useState(0);
  const [totalFeedRequired, setTotalFeedRequired] = useState(0);

  return (
    <FeedContext.Provider 
      value={{ 
        totalBiomass,
        setTotalBiomass,
        fcr,
        setFcr,
        feedingPeriod,
        setFeedingPeriod,
        totalFeedRequired,
        setTotalFeedRequired
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
