import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFeed } from "@/contexts/FeedContext";

const FeedRequirementCalculator = () => {
  const { totalBiomass, setTotalBiomass, fcr, setFcr, feedingPeriod, setFeedingPeriod, setTotalFeedRequired } = useFeed();
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  React.useEffect(() => {
    const feedRequired = totalBiomass * fcr;
    setTotalFeedRequired(feedRequired);
  }, [totalBiomass, fcr, setTotalFeedRequired]);

  const dailyFeed = feedingPeriod > 0 ? (totalBiomass * fcr) / feedingPeriod : 0;

  return (
    <Card className="border-2 border-vismar-green/20 print:shadow-none">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <CardTitle className="text-lg font-bold text-vismar-blue">Feed Requirement Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Total Shrimp Biomass (kg)</Label>
            <Input
              type="text"
              value={totalBiomass > 0 ? formatNumber(totalBiomass) : ''}
              onChange={(e) => setTotalBiomass(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
              placeholder="Enter biomass"
            />
          </div>

          <div className="space-y-2">
            <Label>Feed Conversion Ratio (FCR)</Label>
            <Select onValueChange={(value) => setFcr(parseFloat(value))} value={fcr.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select FCR" />
              </SelectTrigger>
              <SelectContent>
                {[1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value.toFixed(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Feeding Period (days)</Label>
            <Input
              type="text"
              value={feedingPeriod > 0 ? formatNumber(feedingPeriod) : ''}
              onChange={(e) => setFeedingPeriod(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
              placeholder="Enter days"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
            <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total Feed Required</h3>
            <p className="text-2xl font-bold text-vismar-blue">
              {formatNumber(totalBiomass * fcr)} kg
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
            <h3 className="text-lg font-semibold text-vismar-blue mb-2">Daily Feed Quantity</h3>
            <p className="text-2xl font-bold text-vismar-blue">
              {formatNumber(dailyFeed)} kg/day
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedRequirementCalculator;
