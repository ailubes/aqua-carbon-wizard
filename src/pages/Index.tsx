
import AmmoniaCalculator from "@/components/AmmoniaCalculator";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full max-w-7xl mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
          Ammonia Reduction Carbon Calculator
        </h1>
        <p className="text-gray-600 mt-1">
          Calculate the organic carbon needed to reduce ammonia (TAN) levels in your shrimp farm
        </p>
      </header>
      <main className="flex-grow w-full flex items-center justify-center py-4">
        <AmmoniaCalculator />
      </main>
    </div>
  );
};

export default Index;
