
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFeed } from "@/contexts/FeedContext";

const FeedCostAnalyzer = () => {
  const { totalFeedRequired } = useFeed();
  const [feedPrice, setFeedPrice] = React.useState<number>(0);
  const [currency, setCurrency] = React.useState("USD");

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleFeedPriceChange = (value: string) => {
    // Handle decimal input properly
    const numValue = parseFloat(value) || 0;
    setFeedPrice(numValue);
  };

  const totalCost = totalFeedRequired * feedPrice;
  const costPerBag = feedPrice * 25; // Assuming 25kg bags
  const bagsNeeded = Math.ceil(totalFeedRequired / 25);

  return (
    <Card className="border-2 border-vismar-green/20 print:shadow-none">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <CardTitle className="text-lg font-bold text-vismar-blue">Feed Cost Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Feed Required (kg)</Label>
            <Input
              type="text"
              value={totalFeedRequired > 0 ? formatNumber(totalFeedRequired) : ''}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedPrice">Feed Price (per kg)</Label>
            <Input
              id="feedPrice"
              type="number"
              step="0.01"
              value={feedPrice === 0 ? '' : feedPrice}
              onChange={(e) => handleFeedPriceChange(e.target.value)}
              placeholder="e.g., 1.25"
            />
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="PKR">PKR (₨)</option>
              <option value="UAH">UAH (₴)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
            <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total Feed Cost</h3>
            <p className="text-2xl font-bold text-vismar-blue">
              {currency} {formatNumber(totalCost)}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
            <h3 className="text-lg font-semibold text-vismar-blue mb-2">Bags Needed</h3>
            <p className="text-2xl font-bold text-vismar-blue">
              {formatNumber(bagsNeeded)} bags
            </p>
            <p className="text-sm text-gray-600 mt-1">25kg per bag</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
            <h3 className="text-lg font-semibold text-vismar-blue mb-2">Cost per Bag</h3>
            <p className="text-2xl font-bold text-vismar-blue">
              {currency} {formatNumber(costPerBag)}
            </p>
            <p className="text-sm text-gray-600 mt-1">25kg bag price</p>
          </div>
        </div>

        {totalCost > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Feed typically represents 50-60% of total production costs. 
              Monitor FCR closely to optimize feed efficiency.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedCostAnalyzer;
