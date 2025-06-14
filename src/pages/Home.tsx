
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  ArrowRight,
  Calculator as CalculatorIcon,
  TrendingUp,
  HeartPulse,
  Utensils,
  DollarSign,
  TestTubeDiagonal,
  Wind,
  Droplets,
  Activity,
  Beaker,
  BarChart3,
  Calendar,
  Smartphone
} from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-vismar-blue mb-6">
              Smarter Shrimp Farming Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              All-in-one toolset to optimize your vannamei shrimp farm — from stocking to feeding, and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/growth" className="gap-2">
                  <Calculator className="w-5 h-5" />
                  Start Calculating
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a 
                  href="https://www.vismar-aqua.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* App Objectives Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-vismar-blue mb-12">
            Why Use ShrimpPro Tools?
          </h2>
          <div className="prose lg:prose-lg mx-auto text-gray-600">
            <p className="text-lg mb-8">
              Shrimp farming is both art and science. Our app provides smart calculators and management tools 
              to help farmers make data-driven decisions. Whether you're a beginner or managing an advanced 
              RAS system, these tools are designed to:
            </p>
            <ul className="grid md:grid-cols-2 gap-6 list-none p-0">
              <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CalculatorIcon className="w-6 h-6 text-vismar-blue shrink-0 mt-1" />
                <span>Improve accuracy in feed, stocking, and survival estimations</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-vismar-blue shrink-0 mt-1" />
                <span>Optimize production costs and profit margins</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                <Activity className="w-6 h-6 text-vismar-blue shrink-0 mt-1" />
                <span>Support responsible, efficient aquaculture practices</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-vismar-blue shrink-0 mt-1" />
                <span>Simplify complex formulas and projections</span>
              </li>
            </ul>
            <p className="text-center font-medium mt-8">Built by experts, for farmers.</p>
          </div>
        </div>
      </section>

      {/* Available Tools Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-vismar-blue mb-12">
            📊 Available Calculators & Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard 
              icon={CalculatorIcon}
              title="Pond Size & Stocking Calculator"
              description="Calculate optimal pond dimensions and how many PLs (postlarvae) you can safely stock."
              link="/growth"
              status="available"
            />
            <ToolCard 
              icon={TrendingUp}
              title="Growth Projection Tool"
              description="Estimate shrimp weight gain over time using Average Daily Growth (ADG), genetics, and survival assumptions."
              link="/growth"
              status="available"
            />
            <ToolCard 
              icon={HeartPulse}
              title="Survival Rate Calculator"
              description="Evaluate your actual survival percentage and biomass projections for harvest planning."
              link="/growth"
              status="available"
            />
            <ToolCard 
              icon={Utensils}
              title="Feed Requirement Calculator"
              description="Calculate how much feed your shrimp will need based on biomass, FCR, and culture duration."
              link="/feed"
              status="available"
            />
            <ToolCard 
              icon={DollarSign}
              title="Feed Cost Analyzer"
              description="Estimate total feed costs using current market prices — plan your budget and compare feed types."
              link="/feed"
              status="available"
            />
            <ToolCard 
              icon={TestTubeDiagonal}
              title="Ammonia Reduction Calculator"
              description="Determine how much organic carbon you need to reduce ammonia in your biofloc or RAS system."
              link="/ammonia"
              status="available"
            />
            <ToolCard 
              icon={Wind}
              title="Aeration Requirement Calculator"
              description="Calculate oxygen needs and aeration requirements based on biomass and water conditions."
              link="/aeration"
              status="available"
            />
            <ToolCard 
              icon={Droplets}
              title="Evaporation Loss Estimator"
              description="Estimate daily water loss due to evaporation and plan your water management strategy."
              link="/aeration"
              status="available"
            />
            <ToolCard 
              icon={BarChart3}
              title="Cost of Production Calculator"
              description="Calculate total production costs including PL, feed, energy, labor, and other operational expenses."
              link="/economic"
              status="available"
            />
            <ToolCard 
              icon={Beaker}
              title="Water Exchange Calculator"
              description="Determine optimal water exchange rates and volumes for maintaining water quality."
              link="/water/exchange"
              status="available"
            />
            <ToolCard 
              icon={Activity}
              title="Alkalinity Adjustment"
              description="Calculate lime requirements to maintain optimal alkalinity levels in your pond."
              link="/water/alkalinity"
              status="available"
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-vismar-blue mb-8">
            🚀 More Tools Coming Soon
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            We're continuously developing new tools to support your aquaculture operations
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ComingSoonCard 
              icon={Calendar}
              title="Harvest Planning & Profitability Forecast"
              description="Predict optimal harvest timing and profitability scenarios"
            />
            <ComingSoonCard 
              icon={Smartphone}
              title="Shrimp Health Logs & Feeding Schedules"
              description="Track daily observations and feeding regimens"
            />
            <ComingSoonCard 
              icon={BarChart3}
              title="Multi-Pond Management Dashboard"
              description="Manage multiple ponds and compare performance"
            />
            <ComingSoonCard 
              icon={TrendingUp}
              title="Historical Batch Analysis"
              description="Compare past cycles and identify improvement areas"
            />
          </div>
          <div className="mt-12 p-6 bg-blue-50 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-vismar-blue mb-3">Want to suggest a feature?</h3>
            <p className="text-gray-600 mb-4">
              Have an idea for a calculator that would help your farming operation? We'd love to hear from you.
            </p>
            <Button variant="outline" asChild>
              <a 
                href="https://www.vismar-aqua.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </Button>
          </div>
          <p className="mt-12 text-xl text-gray-600 font-medium">
            You grow — we grow with you.
          </p>
        </div>
      </section>
    </div>
  );
};

// Tool Card Component
const ToolCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link,
  status = "available"
}: { 
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  link: string;
  status?: "available" | "coming-soon";
}) => (
  <Link 
    to={link}
    className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
  >
    <div className="flex items-start justify-between mb-4">
      <Icon className="w-8 h-8 text-vismar-blue" />
      {status === "available" && (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          Available
        </span>
      )}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

// Coming Soon Card Component
const ComingSoonCard = ({ 
  icon: Icon, 
  title,
  description
}: { 
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
    <Icon className="w-8 h-8 text-gray-400 mb-4 mx-auto" />
    <h3 className="text-lg font-medium text-gray-800 mb-3">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
    <div className="mt-4">
      <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
        Coming Soon
      </span>
    </div>
  </div>
);

export default Home;
