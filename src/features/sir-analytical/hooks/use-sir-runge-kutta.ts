import { useMemo, useState } from "react";
import { calculateCoefficients, solveSIR } from "../logic/runge-kutta-solver";
import type { SirParameters, SirResult } from "../types/sir-analytical-types";

export interface UseSirRungeKuttaReturn {
  parameters: SirParameters;
  result: SirResult;
  coefficients: { betaAnalytical: number; gamma: number; r0: number };
  setContactPerDay: (value: number) => void;
  setInfectionRate: (value: number) => void;
  setRecoveryDays: (value: number) => void;
  setInitialInfected: (value: number) => void;
}

const DEFAULT_PARAMS: SirParameters = {
  population: 2000, // エージェントベースと統一
  contactPerDay: 10,
  infectionRate: 3, // % 表記（3% = β_agent 0.03 相当）
  recoveryDays: 14, // γ ≈ 0.0714（エージェントベースの0.07に近い）
  initialInfected: 2, // 0.1% (エージェントベースと同じ割合)
  maxDays: 120,
  dt: 1,
};

export function useSirRungeKutta(): UseSirRungeKuttaReturn {
  const [contactPerDay, setContactPerDay] = useState(
    DEFAULT_PARAMS.contactPerDay,
  );
  const [infectionRate, setInfectionRate] = useState(
    DEFAULT_PARAMS.infectionRate,
  );
  const [recoveryDays, setRecoveryDays] = useState(DEFAULT_PARAMS.recoveryDays);
  const [initialInfected, setInitialInfected] = useState(
    DEFAULT_PARAMS.initialInfected,
  );

  // パラメータオブジェクトを構築
  const parameters: SirParameters = useMemo(
    () => ({
      population: DEFAULT_PARAMS.population,
      contactPerDay,
      infectionRate,
      recoveryDays,
      initialInfected,
      maxDays: DEFAULT_PARAMS.maxDays,
      dt: DEFAULT_PARAMS.dt,
    }),
    [contactPerDay, infectionRate, recoveryDays, initialInfected],
  );

  // 係数（β, γ, R₀）を計算
  const coefficients = useMemo(
    () => calculateCoefficients(parameters),
    [parameters],
  );

  // SIRモデルを解く
  const result = useMemo(() => solveSIR(parameters), [parameters]);

  return {
    parameters,
    result,
    coefficients,
    setContactPerDay,
    setInfectionRate,
    setRecoveryDays,
    setInitialInfected,
  };
}
