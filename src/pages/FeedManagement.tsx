
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, DollarSign } from "lucide-react";

const FeedManagement = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <Utensils className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Feed Requirement Calculator</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Calculate feed requirements based on biomass, FCR, and feeding period.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <DollarSign className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Feed Cost Analyzer</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Analyze feed costs based on feed price and total required amount.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedManagement;
