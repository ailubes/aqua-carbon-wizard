
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";

const EconomicTools = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full max-w-7xl mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
          Economic & Profitability Tools
        </h1>
        <p className="text-gray-600 mt-1">
          Tools to analyze costs, plan harvest, and optimize profitability
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <DollarSign className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Cost of Production Calculator</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Calculate total production costs including postlarvae, feed, energy, and labor.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Break-Even Price Calculator</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Calculate break-even price based on total costs and expected yield.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <Calendar className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Harvest Planner</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Plan optimal harvest time based on target shrimp size, growth rates, and market conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EconomicTools;
