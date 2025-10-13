'use client';

import { type RefObject, useId, useState } from 'react';
import type { createAnimator } from '../logic/animator';
import { applyConfig } from '../logic/hud-apply-config';

type Config = {
  populationN: number;
  infectionRadius: number;
  beta: number;
  gamma: number;
  initialInfected: number;
  agentRadius: number;
  fatality: number;
  colors: { S: string; I: string; R: string };
  historyMax: number;
};

export const HudPanel = ({
  config,
  mainCanvasRef,
  animatorRef,
}: {
  config: Config;
  mainCanvasRef: RefObject<HTMLCanvasElement | null>;
  animatorRef: RefObject<ReturnType<typeof createAnimator> | null>;
}) => {
  const [popN, setPopN] = useState(config.populationN);
  const [beta, setBeta] = useState(config.beta);
  const [gamma, setGamma] = useState(config.gamma);
  const [initI, setInitI] = useState(config.initialInfected);
  const [fatality, setFatality] = useState(config.fatality);
  const baseId = useId();
  const idPopN = `${baseId}-popN`;
  const idBeta = `${baseId}-beta`;
  const idGamma = `${baseId}-gamma`;
  const idInitI = `${baseId}-initI`;
  const idFatality = `${baseId}-fatality`;

  const handleApply = () => {
    applyConfig(
      {
        populationN: Math.max(1, Math.floor(popN)),
        beta: Math.max(0, beta),
        gamma: Math.max(0, gamma),
        initialInfected: Math.max(0, Math.floor(initI)),
        fatality: Math.min(1, Math.max(0, fatality)),
      },
      mainCanvasRef,
      animatorRef,
    );
  };

  return (
    <div className="fixed top-2 left-1 right-1 sm:left-auto sm:right-2 bg-black/50 text-white p-2 rounded-md text-[12px] leading-[1.4] font-sans z-10">
      <div className="row my-1 whitespace-nowrap">
        <label htmlFor={idPopN} className="inline-block w-[90px] sm:w-[110px]">
          人口 N
        </label>
        <input
          id={idPopN}
          type="number"
          min={1}
          max={2000}
          step={1}
          className="w-[80px]"
          value={popN}
          onChange={(e) => setPopN(Number(e.target.value))}
        />
      </div>
      <div className="row my-1 whitespace-nowrap">
        <label htmlFor={idBeta} className="inline-block w-[90px] sm:w-[110px]">
          感染率 β
        </label>
        <input
          id={idBeta}
          type="number"
          min={0}
          max={5}
          step={0.01}
          className="w-[80px]"
          value={beta}
          onChange={(e) => setBeta(Number(e.target.value))}
        />
      </div>
      <div className="row my-1 whitespace-nowrap">
        <label htmlFor={idGamma} className="inline-block w-[90px] sm:w-[110px]">
          回復率 γ
        </label>
        <input
          id={idGamma}
          type="number"
          min={0}
          max={5}
          step={0.01}
          className="w-[80px]"
          value={gamma}
          onChange={(e) => setGamma(Number(e.target.value))}
        />
      </div>
      <div className="row my-1 whitespace-nowrap">
        <label htmlFor={idInitI} className="inline-block w-[90px] sm:w-[110px]">
          初期感染者数
        </label>
        <input
          id={idInitI}
          type="number"
          min={0}
          max={2000}
          step={1}
          className="w-[80px]"
          value={initI}
          onChange={(e) => setInitI(Number(e.target.value))}
        />
      </div>
      <div className="row my-1 whitespace-nowrap">
        <label
          htmlFor={idFatality}
          className="inline-block w-[90px] sm:w-[110px]"
        >
          致死率
        </label>
        <input
          id={idFatality}
          type="number"
          min={0}
          max={1}
          step={0.001}
          className="w-[80px]"
          value={fatality}
          onChange={(e) => setFatality(Number(e.target.value))}
        />
      </div>
      <button
        type="button"
        className="mt-[6px] w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded cursor-pointer transition-colors"
        onClick={handleApply}
      >
        適用
      </button>
      <div className="mt-1 opacity-80">
        数値を変更して「適用」を押してください
      </div>
    </div>
  );
};
