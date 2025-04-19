
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
  Calculator as CalcIcon,
  Activity,
  Droplets
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

      {/* Tools Overview Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-vismar-blue mb-12">
            📊 Included Calculators & Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard 
              icon={CalculatorIcon}
              title="Stocking Density Calculator"
              description="Calculate how many PLs (postlarvae) you can safely stock based on your pond or tank size."
              link="/growth"
            />
            <ToolCard 
              icon={TrendingUp}
              title="Growth Projection Tool"
              description="Estimate shrimp weight gain over time using Average Daily Growth (ADG), genetics, and survival assumptions."
              link="/growth"
            />
            <ToolCard 
              icon={HeartPulse}
              title="Survival Rate Estimator"
              description="Quickly evaluate your actual survival percentage after a harvest — compare expected vs real-world performance."
              link="/growth"
            />
            <ToolCard 
              icon={Utensils}
              title="Feed Requirement Calculator"
              description="Calculate how much feed your shrimp will need based on biomass, FCR, and culture duration."
              link="/feed"
            />
            <ToolCard 
              icon={DollarSign}
              title="Feed Cost Analyzer"
              description="Estimate total feed costs using current market prices — plan your budget and compare feed types."
              link="/feed"
            />
            <ToolCard 
              icon={TestTubeDiagonal}
              title="Ammonia Reduction Calculator"
              description="Determine how much organic carbon you need to reduce ammonia in your biofloc or RAS system."
              link="/"
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-vismar-blue mb-12">
            More Tools Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ComingSoonCard 
              icon={Wind}
              title="Aeration and oxygen budgeting"
            />
            <ComingSoonCard 
              icon={CalcIcon}
              title="Harvest planning & profitability forecast"
            />
            <ComingSoonCard 
              icon={Droplets}
              title="Water exchange and alkalinity corrections"
            />
            <ComingSoonCard 
              icon={Activity}
              title="Shrimp health logs and feeding schedules"
            />
          </div>
          <p className="mt-12 text-xl text-gray-600">
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
  link 
}: { 
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  link: string;
}) => (
  <Link 
    to={link}
    className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <Icon className="w-8 h-8 text-vismar-blue mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

// Coming Soon Card Component
const ComingSoonCard = ({ 
  icon: Icon, 
  title 
}: { 
  icon: React.ComponentType<any>;
  title: string;
}) => (
  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
    <Icon className="w-8 h-8 text-gray-400 mb-4 mx-auto" />
    <h3 className="text-lg font-medium text-gray-600">{title}</h3>
  </div>
);

export default Home;
