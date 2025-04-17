
import AmmoniaCalculator from "@/components/AmmoniaCalculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <header className="w-full max-w-7xl p-4 flex justify-center mb-4">
        <h1 className="text-4xl font-bold text-vismar-blue">
          Ammonia Reduction Carbon Calculator
        </h1>
      </header>
      <main className="flex-grow w-full flex items-center justify-center py-8">
        <AmmoniaCalculator />
      </main>
      <footer className="w-full text-center p-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} Vismar Aqua - Aquaculture Solutions
      </footer>
    </div>
  );
};

export default Index;
