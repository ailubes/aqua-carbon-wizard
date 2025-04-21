
import React from "react";
import FeedRequirementCalculator from "@/components/feed/FeedRequirementCalculator";
import FeedCostAnalyzer from "@/components/feed/FeedCostAnalyzer";
import { FeedProvider, useFeed } from "@/contexts/FeedContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeedManagementContent = () => {
  const { totalBiomass, feedingPeriod } = useFeed();
  const navigate = useNavigate();

  const handleNext = () => {
    // Forward calculated values to Water Quality section
    navigate("/water", {
      state: {
        biomass: totalBiomass,
        feedingPeriod: feedingPeriod,
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
          Next: Water Quality
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
