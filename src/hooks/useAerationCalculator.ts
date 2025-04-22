import { useState, useMemo } from 'react';

export type AerationType = 'paddlewheel' | 'venturi' | 'diffuser' | 'mixed';
export type AreaUnit = 'm2' | 'hectares' | 'acres';

interface Calculations {
  totalShrimp: number;
  biomass: number;
  requiredKw: number;
  requiredHp: number;
}

interface AerationStatus {
  isAdequate: boolean;
}

const convertToSquareMeters = (value: number, fromUnit: AreaUnit): number => {
  switch (fromUnit) {
    case 'hectares':
      return value * 10000; // 1 hectare = 10,000 m²
    case 'acres':
      return value * 4046.86; // 1 acre = 4,046.86 m²
    default:
      return value;
  }
};

export function useAerationCalculator() {
  const [pondArea, setPondArea] = useState<number>(0);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('m2');
  const [stockingDensity, setStockingDensity] = useState<number>(25);
  const [survivalRate, setSurvivalRate] = useState<number>(80);
  const [avgWeight, setAvgWeight] = useState<number>(25);
  const [aerationType, setAerationType] = useState<AerationType>('paddlewheel');
  const [installedAeration, setInstalledAeration] = useState<number>(0);

  const calculations = useMemo<Calculations | null>(() => {
    if (!pondArea) {
      return null;
    }

    const areaInSquareMeters = convertToSquareMeters(pondArea, areaUnit);
    const totalShrimp = areaInSquareMeters * stockingDensity;
    const biomass = (totalShrimp * (survivalRate / 100) * avgWeight) / 1000;
    const requiredKw = biomass / 400;
    const requiredHp = requiredKw * 1.34;

    return {
      totalShrimp,
      biomass,
      requiredKw,
      requiredHp,
    };
  }, [pondArea, areaUnit, stockingDensity, survivalRate, avgWeight]);

  const aerationStatus = useMemo<AerationStatus>(() => {
    if (!calculations || !installedAeration) {
      return { isAdequate: true };
    }

    return {
      isAdequate: installedAeration >= calculations.requiredKw,
    };
  }, [calculations, installedAeration]);

  return {
    pondArea,
    setPondArea,
    areaUnit,
    setAreaUnit,
    stockingDensity,
    setStockingDensity,
    survivalRate,
    setSurvivalRate,
    avgWeight,
    setAvgWeight,
    aerationType,
    setAerationType,
    installedAeration,
    setInstalledAeration,
    calculations,
    aerationStatus,
  };
}
