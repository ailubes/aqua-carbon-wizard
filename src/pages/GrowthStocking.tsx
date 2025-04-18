
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock } from "lucide-react";

const GrowthStocking = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full max-w-7xl mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
          Growth & Stocking Management
        </h1>
        <p className="text-gray-600 mt-1">
          Tools to optimize stocking density and predict growth patterns
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Stocking Density Calculator</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Calculate optimal stocking density based on pond size and postlarvae (PL) count.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Growth Projection Calculator</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Project shrimp growth based on initial weight, days of culture, and average daily growth rate.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-vismar-green/20">
          <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <div className="flex items-center mb-2">
              <Clock className="h-6 w-6 text-vismar-green mr-2" />
              <CardTitle className="text-lg font-bold text-vismar-blue">Survival Rate Estimator</CardTitle>
            </div>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600">
              Estimate survival rates based on initial and final shrimp counts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrowthStocking;
