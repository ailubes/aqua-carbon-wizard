
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GrowthStocking from "./pages/GrowthStocking";
import FeedManagement from "./pages/FeedManagement";
import WaterQuality from "./pages/WaterQuality";
import AerationEnvironment from "./pages/AerationEnvironment";
import EconomicTools from "./pages/EconomicTools";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path="/ammonia" element={
            <MainLayout>
              <Index />
            </MainLayout>
          } />
          <Route path="/growth" element={
            <MainLayout>
              <GrowthStocking />
            </MainLayout>
          } />
          <Route path="/feed" element={
            <MainLayout>
              <FeedManagement />
            </MainLayout>
          } />
          <Route path="/water" element={
            <MainLayout>
              <WaterQuality />
            </MainLayout>
          } />
          <Route path="/aeration" element={
            <MainLayout>
              <AerationEnvironment />
            </MainLayout>
          } />
          <Route path="/economic" element={
            <MainLayout>
              <EconomicTools />
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
