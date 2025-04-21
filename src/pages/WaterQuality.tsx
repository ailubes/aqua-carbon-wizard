
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Droplet, FlaskRound } from "lucide-react";

const navItems = [
  {
    name: "Water Exchange",
    path: "/water/exchange",
    icon: <Droplet className="w-5 h-5" />,
  },
  {
    name: "Alkalinity Adjustment",
    path: "/water/alkalinity",
    icon: <FlaskRound className="w-5 h-5" />,
  },
];

const WaterQuality = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <header className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-vismar-blue">
          Water Quality Management
        </h1>
        <p className="text-gray-600 mt-1">
          Choose the water quality tool you wish to use.
        </p>
      </header>
      <nav className="w-full max-w-xl flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center px-5 py-4 rounded-lg shadow-md bg-white border-2 transition
              ${
                location.pathname === item.path
                  ? "border-vismar-blue/70 text-vismar-blue font-bold"
                  : "border-gray-200 text-gray-700 hover:border-vismar-green/50 hover:shadow-lg"
              }
            `}
          >
            {item.icon}
            <span className="ml-3 text-lg">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default WaterQuality;
