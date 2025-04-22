
import { useState, useMemo } from 'react';

type AerationType = 'paddlewheel' | 'venturi' | 'diffuser' | 'mixed';

interface Calculations {
  totalShrimp: number;
  biomass: number;
  requiredKw: number;
  requiredHp: number;
}

interface AerationStatus {
  isAdequate: boolean;
}

export function useAerationCalculator() {
  const [pondArea, setPondArea] = useState<number>(0);
  const [stockingDensity, setStockingDensity] = useState<number>(25);
  const [survivalRate, setSurvivalRate] = useState<number>(80);
  const [avgWeight, setAvgWeight] = useState<number>(25);
  const [aerationType, setAerationType] = useState<AerationType>('paddlewheel');
  const [installedAeration, setInstalledAeration] = useState<number>(0);

  const calculations = useMemo<Calculations | null>(() => {
    if (!pondArea || !stockingDensity || !survivalRate || !avgWeight) {
      return null;
    }

    const totalShrimp = pondArea * stockingDensity;
    const biomass = (totalShrimp * (survivalRate / 100) * avgWeight) / 1000;
    const requiredKw = biomass / 400;
    const requiredHp = requiredKw * 1.34;

    return {
      totalShrimp,
      biomass,
      requiredKw,
      requiredHp,
    };
  }, [pondArea, stockingDensity, survivalRate, avgWeight]);

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
