
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCost } from "@/contexts/CostContext";
import { DollarSign, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGrowth } from "@/contexts/GrowthContext";

// Component for postlarvae costs
const PostlarvaeCostInput = () => {
  const { plCount, setPlCount, plUnitPrice, setPlUnitPrice, plTotalCost } = useCost();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pl-count">Postlarvae Quantity</Label>
          <Input
            id="pl-count"
            type="text"
            value={plCount > 0 ? formatNumber(plCount) : ''}
            onChange={(e) => setPlCount(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pl-price">Price per 1,000 PL</Label>
          <Input
            id="pl-price"
            type="text"
            value={plUnitPrice > 0 ? formatNumber(plUnitPrice) : ''}
            onChange={(e) => setPlUnitPrice(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
        <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total PL Cost</h3>
        <p className="text-2xl font-bold text-vismar-blue">
          {formatNumber(plTotalCost)}
        </p>
      </div>
    </div>
  );
};

// Component for feed costs
const FeedCostInput = () => {
  const { feedAmount, setFeedAmount, feedUnitPrice, setFeedUnitPrice, feedTotalCost, totalCost } = useCost();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const feedCostPercentage = totalCost > 0 ? (feedTotalCost / totalCost) * 100 : 0;
  const showAlert = feedCostPercentage > 60;

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="feed-amount">Total Feed Required (kg)</Label>
          <Input
            id="feed-amount"
            type="text"
            value={feedAmount > 0 ? formatNumber(feedAmount) : ''}
            onChange={(e) => setFeedAmount(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feed-price">Feed Price (per kg)</Label>
          <Input
            id="feed-price"
            type="text"
            value={feedUnitPrice > 0 ? formatNumber(feedUnitPrice) : ''}
            onChange={(e) => setFeedUnitPrice(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
      </div>
      
      {showAlert && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            🔍 Feed appears to be the dominant expense ({feedCostPercentage.toFixed(1)}% of total) — consider evaluating FCR or feed efficiency.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mt-4 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
        <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total Feed Cost</h3>
        <p className="text-2xl font-bold text-vismar-blue">
          {formatNumber(feedTotalCost)}
        </p>
      </div>
    </div>
  );
};

// Component for energy/aeration costs
const EnergyCostInput = () => {
  const { 
    aerationPower, 
    setAerationPower, 
    operationHours, 
    setOperationHours, 
    energyUnitPrice, 
    setEnergyUnitPrice,
    cultureDuration,
    setCultureDuration,
    energyTotalCost 
  } = useCost();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="aeration-power">Aeration Power Required (kW)</Label>
          <Input
            id="aeration-power"
            type="text"
            value={aerationPower > 0 ? formatNumber(aerationPower) : ''}
            onChange={(e) => setAerationPower(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="operation-hours">Daily Operation (hours)</Label>
          <Input
            id="operation-hours"
            type="text"
            value={operationHours > 0 ? formatNumber(operationHours) : ''}
            onChange={(e) => setOperationHours(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="energy-price">Energy Price (per kWh)</Label>
          <Input
            id="energy-price"
            type="text"
            value={energyUnitPrice > 0 ? formatNumber(energyUnitPrice) : ''}
            onChange={(e) => setEnergyUnitPrice(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="culture-duration">Culture Duration (days)</Label>
          <Input
            id="culture-duration"
            type="text"
            value={cultureDuration > 0 ? formatNumber(cultureDuration) : ''}
            onChange={(e) => setCultureDuration(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
        <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total Energy Cost</h3>
        <p className="text-2xl font-bold text-vismar-blue">
          {formatNumber(energyTotalCost)}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Based on {formatNumber(cultureDuration)} days of culture
        </p>
      </div>
    </div>
  );
};

// Component for labor costs
const LaborCostInput = () => {
  const { 
    monthlyLaborCost, 
    setMonthlyLaborCost, 
    workerCount, 
    setWorkerCount, 
    cultureDuration,
    laborTotalCost 
  } = useCost();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthly-labor">Monthly Labor Cost</Label>
          <Input
            id="monthly-labor"
            type="text"
            value={monthlyLaborCost > 0 ? formatNumber(monthlyLaborCost) : ''}
            onChange={(e) => setMonthlyLaborCost(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="worker-count">Number of Workers</Label>
          <Input
            id="worker-count"
            type="text"
            value={workerCount > 0 ? formatNumber(workerCount) : ''}
            onChange={(e) => setWorkerCount(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
          />
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
        <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total Labor Cost</h3>
        <p className="text-2xl font-bold text-vismar-blue">
          {formatNumber(laborTotalCost)}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          For {formatNumber(cultureDuration / 30)} months
        </p>
      </div>
    </div>
  );
};

// Component for other costs
const OtherCostInput = () => {
  const { otherCosts, setOtherCosts } = useCost();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="other-costs">Other Costs (water mgmt, additives, medications, etc.)</Label>
        <Input
          id="other-costs"
          type="text"
          value={otherCosts > 0 ? formatNumber(otherCosts) : ''}
          onChange={(e) => setOtherCosts(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
        />
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
        <h3 className="text-lg font-semibold text-vismar-blue mb-2">Total Other Costs</h3>
        <p className="text-2xl font-bold text-vismar-blue">
          {formatNumber(otherCosts)}
        </p>
      </div>
    </div>
  );
};

// Summary and profit calculation component
const ProductionSummary = () => {
  const { 
    plTotalCost,
    feedTotalCost,
    energyTotalCost,
    laborTotalCost,
    otherCosts,
    totalCost,
    costPerKg,
    currency,
    setCurrency,
    sellingPrice,
    setSellingPrice,
    grossRevenue,
    profit
  } = useCost();
  
  const { projectedWeight } = useGrowth();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  // High cost alert
  const averageCost = 8; // Example average cost per kg in USD
  const showAlert = costPerKg > averageCost;
  
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between mb-4">
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="PKR">PKR (₨)</SelectItem>
              <SelectItem value="UAH">UAH (₴)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handlePrintSummary} className="print:hidden">Export to PDF</Button>
      </div>
      
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold text-vismar-blue mb-4">Production Costs Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Postlarvae:</span>
            <span>{currency} {formatNumber(plTotalCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Feed:</span>
            <span>{currency} {formatNumber(feedTotalCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Energy/Aeration:</span>
            <span>{currency} {formatNumber(energyTotalCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Labor:</span>
            <span>{currency} {formatNumber(laborTotalCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Other costs:</span>
            <span>{currency} {formatNumber(otherCosts)}</span>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-bold">
            <span>Total Cost:</span>
            <span>{currency} {formatNumber(totalCost)}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
          <h3 className="text-lg font-semibold text-vismar-blue mb-2">Cost per kg</h3>
          <p className="text-2xl font-bold text-vismar-blue">
            {currency} {formatNumber(costPerKg)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Based on {formatNumber(projectedWeight)} kg projected harvest
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="selling-price">Selling Price (per kg)</Label>
            <Input
              id="selling-price"
              type="text"
              value={sellingPrice > 0 ? formatNumber(sellingPrice) : ''}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value.replace(/,/g, '')) || 0)}
            />
          </div>
          
          {sellingPrice > 0 && (
            <div className="p-4 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Gross Revenue:</span>
                <span>{currency} {formatNumber(grossRevenue)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Estimated Profit:</span>
                <span className={profit >= 0 ? "text-green-600" : "text-red-600"}>
                  {currency} {formatNumber(profit)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showAlert && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            ⚠️ High production cost — review stocking rate or energy input.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

// Main Cost of Production Calculator component
const CostOfProductionCalculator = () => {
  return (
    <Card className="border-2 border-vismar-green/20">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <div className="flex items-center mb-2">
          <DollarSign className="h-6 w-6 text-vismar-green mr-2" />
          <CardTitle className="text-lg font-bold text-vismar-blue">Cost of Production Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="pl">Postlarvae</TabsTrigger>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="labor">Labor</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <ProductionSummary />
          </TabsContent>
          <TabsContent value="pl">
            <PostlarvaeCostInput />
          </TabsContent>
          <TabsContent value="feed">
            <FeedCostInput />
          </TabsContent>
          <TabsContent value="energy">
            <EnergyCostInput />
          </TabsContent>
          <TabsContent value="labor">
            <LaborCostInput />
          </TabsContent>
          <TabsContent value="other">
            <OtherCostInput />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CostOfProductionCalculator;
