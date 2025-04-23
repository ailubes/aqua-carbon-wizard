
import { useState, useMemo } from 'react';

// Types
export type RegionalPreset = {
  name: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

export type EvaporationCalculationResult = {
  evaporationRate: number; // mm/day
  waterLoss: number; // L/day
  waterLossCubicMeters: number; // m³/day
  weeklyWaterLoss: number; // L/week
  monthlyWaterLoss: number; // L/month
  isHighEvaporation: boolean;
};

export const REGIONAL_PRESETS: RegionalPreset[] = [
  {
    name: "Hot Dry (Punjab)",
    temperature: 38,
    humidity: 30,
    windSpeed: 3.5
  },
  {
    name: "Humid Coastal (Sindh)",
    temperature: 32,
    humidity: 75,
    windSpeed: 4.0
  },
  {
    name: "Tropical (SE Asia)",
    temperature: 30,
    humidity: 80,
    windSpeed: 2.0
  },
];

export const useEvaporationLossCalculator = () => {
  const [pondArea, setPondArea] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(30);
  const [humidity, setHumidity] = useState<number>(60);
  const [windSpeed, setWindSpeed] = useState<number>(2);
  const [evaporationCoefficient, setEvaporationCoefficient] = useState<number>(1.1);
  const [showWeeklyMonthly, setShowWeeklyMonthly] = useState<boolean>(false);

  // Apply a preset
  const applyPreset = (preset: RegionalPreset) => {
    setTemperature(preset.temperature);
    setHumidity(preset.humidity);
    setWindSpeed(preset.windSpeed);
  };

  // Calculate evaporation loss
  const calculations: EvaporationCalculationResult | null = useMemo(() => {
    const parsedPondArea = parseFloat(pondArea);
    
    if (isNaN(parsedPondArea) || parsedPondArea <= 0) {
      return null;
    }

    // Simplified evaporation formula: E (mm/day) = (0.408 × (Temp + 18) × (100 - RH) / 100) × K
    const evaporationRate = (0.408 * (temperature + 18) * (100 - humidity) / 100) * evaporationCoefficient;
    
    // Wind adjustment factor (simplified)
    const windAdjustedRate = evaporationRate * (1 + (windSpeed - 2) * 0.1);
    
    // Each mm of evaporation over 1 m² = 1 liter
    const waterLoss = windAdjustedRate * parsedPondArea;
    
    // Weekly and monthly projections
    const weeklyWaterLoss = waterLoss * 7;
    const monthlyWaterLoss = waterLoss * 30;
    
    // Convert to cubic meters if large
    const waterLossCubicMeters = waterLoss / 1000;
    
    // Flag if evaporation rate is high (> 8mm/day is considered high)
    const isHighEvaporation = windAdjustedRate > 8;

    return {
      evaporationRate: windAdjustedRate,
      waterLoss,
      waterLossCubicMeters,
      weeklyWaterLoss,
      monthlyWaterLoss,
      isHighEvaporation
    };
  }, [pondArea, temperature, humidity, windSpeed, evaporationCoefficient]);

  return {
    pondArea,
    setPondArea,
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    windSpeed,
    setWindSpeed,
    evaporationCoefficient,
    setEvaporationCoefficient,
    showWeeklyMonthly,
    setShowWeeklyMonthly,
    calculations,
    applyPreset,
    REGIONAL_PRESETS
  };
};
