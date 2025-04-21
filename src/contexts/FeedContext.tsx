
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
  fcr: 1.4, // Default FCR is now 1.4
  setFcr: () => {},
  feedingPeriod: 0,
  setFeedingPeriod: () => {},
  totalFeedRequired: 0,
  setTotalFeedRequired: () => {},
});

export const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  // Get initial biomass from URL state if available
  const initialBiomass = window.history.state?.usr?.biomass || 0;
  const initialFeedingPeriod = window.history.state?.usr?.feedingPeriod || 0;

  const [totalBiomass, setTotalBiomass] = useState(initialBiomass);
  const [fcr, setFcr] = useState(1.4); // Default FCR = 1.4
  const [feedingPeriod, setFeedingPeriod] = useState(initialFeedingPeriod);
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
