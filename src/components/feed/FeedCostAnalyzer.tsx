
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFeed } from "@/contexts/FeedContext";
import { DollarSign } from "lucide-react";

const FeedCostAnalyzer = () => {
  const { totalFeedRequired } = useFeed();
  const [feedPrice, setFeedPrice] = React.useState(0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const totalCost = totalFeedRequired * feedPrice;

  return (
    <Card className="border-2 border-vismar-green/20 print:shadow-none">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <div className="flex items-center mb-2">
          <DollarSign className="h-6 w-6 text-vismar-green mr-2" />
          <CardTitle className="text-lg font-bold text-vismar-blue">Feed Cost Analyzer</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Total Feed Required</Label>
            <Input type="text" value={formatNumber(totalFeedRequired)} disabled />
          </div>

          <div className="space-y-2">
            <Label>Feed Price (per kg)</Label>
            <Input
              type="text"
              value={feedPrice > 0 ? formatNumber(feedPrice) : ''}
              onChange={(e) => setFeedPrice(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
              placeholder="Enter price per kg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total Feed Cost</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            ${formatNumber(totalCost)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedCostAnalyzer;
