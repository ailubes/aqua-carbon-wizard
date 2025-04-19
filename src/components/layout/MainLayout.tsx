
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Droplets, 
  TrendingUp, 
  Utensils, 
  Wind, 
  DollarSign, 
  Menu, 
  X,
  TestTubeDiagonal  // Add this import for the new icon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  active?: boolean;
  currentModule?: boolean;
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      name: "Growth & Stocking",
      path: "/growth",
      icon: TrendingUp,
      active: location.pathname === "/growth"
    },
    {
      name: "Feed Management",
      path: "/feed",
      icon: Utensils,
      active: location.pathname === "/feed"
    },
    {
      name: "Water Quality",
      path: "/water",
      icon: Droplets,
      active: location.pathname === "/water"
    },
    {
      name: "Ammonia Reduction",
      path: "/",
      icon: TestTubeDiagonal,  // Updated icon
      currentModule: true,
      active: location.pathname === "/"
    },
    {
      name: "Aeration & Environment",
      path: "/aeration",
      icon: Wind,
      active: location.pathname === "/aeration"
    },
    {
      name: "Economic Tools",
      path: "/economic",
      icon: DollarSign,
      active: location.pathname === "/economic"
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <header className="w-full bg-white shadow-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="https://www.vismar-aqua.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/98e047df-7587-4527-9e1f-c529103e2a20.png" 
              alt="Vismar Aqua Logo" 
              className="h-12 w-auto" 
            />
          </a>
          <h1 className="text-xl md:text-2xl font-bold text-vismar-blue ml-4 hidden md:block">
            Vismar Aqua Tools
          </h1>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </header>

      <div className="flex flex-1 w-full">
        {/* Sidebar - Always visible on desktop, togglable on mobile */}
        <aside 
          className={cn(
            "bg-white shadow-md z-40 transition-all duration-300 ease-in-out",
            isMobile 
              ? `fixed inset-y-0 left-0 mt-16 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
              : "w-64"
          )}
        >
          <nav className="py-4 px-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                    item.active
                      ? "bg-vismar-green/20 text-vismar-blue"
                      : "text-gray-600 hover:text-vismar-blue hover:bg-vismar-green/10"
                  )}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                  {item.currentModule && (
                    <span className="ml-auto bg-vismar-green text-xs text-white font-bold py-1 px-2 rounded-full">
                      Ready
                    </span>
                  )}
                </Link>
              ))}
            </div>
            
            <div className="mt-8 px-3">
              <div className="bg-blue-50 rounded-md p-4">
                <h3 className="text-vismar-blue font-semibold mb-2">Coming Soon</h3>
                <p className="text-sm text-gray-600">
                  More calculators and tools are being developed. Check back soon!
                </p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isMobile ? "w-full" : "ml-0"
        )}>
          {/* Dark overlay when sidebar is open on mobile */}
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
          
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>

      <footer className="w-full text-center p-4 text-gray-600 text-sm bg-white border-t">
        <div>
          © {new Date().getFullYear()} Vismar Aqua - Aquaculture Solutions | 
          <a 
            href="https://www.vismar-aqua.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-vismar-blue hover:underline ml-1"
          >
            www.vismar-aqua.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
