import React from "react";
import FeedRequirementCalculator from "@/components/feed/FeedRequirementCalculator";
import FeedCostAnalyzer from "@/components/feed/FeedCostAnalyzer";
import { FeedProvider, useFeed } from "@/contexts/FeedContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeedManagementContent = () => {
  const { totalBiomass, setTotalBiomass, feedingPeriod, setFeedingPeriod } = useFeed();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state) {
      const { biomass, daysOfCulture, plCount } = location.state;
      if (biomass && (!totalBiomass || totalBiomass === 0)) {
        setTotalBiomass(Number(biomass));
      }
      if (daysOfCulture && (!feedingPeriod || feedingPeriod === 0)) {
        setFeedingPeriod(Number(daysOfCulture));
      }
    }
  }, [location.state, setTotalBiomass, setFeedingPeriod, totalBiomass, feedingPeriod]);

  const handleNext = () => {
    navigate("/aeration", {
      state: {
        biomass: totalBiomass,
        feedingPeriod,
        ...(location.state ? location.state : {}),
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full max-w-7xl mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
          Feed Management
        </h1>
        <p className="text-gray-600 mt-1">
          Tools to optimize feed usage and analyze feeding costs
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 w-full max-w-7xl print:!grid-cols-1 print:gap-8">
        <FeedRequirementCalculator />
        <FeedCostAnalyzer />
      </div>
      <div className="w-full max-w-7xl flex justify-end mt-8">
        <Button variant="default" onClick={handleNext}>
          Next: Aeration & Environment
        </Button>
      </div>
    </div>
  );
};

const FeedManagement = () => {
  return (
    <FeedProvider>
      <FeedManagementContent />
    </FeedProvider>
  );
};

export default FeedManagement;
