'use client';

import { type RefObject, useEffect, useId, useMemo, useState } from 'react';
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

/**
 * 右上に配置されるヒュードパネル
 *　　シミュレーションの設定を変更するためのUIです。
 * @param config 設定
 * @param mainCanvasRef メインキャンバスのref
 * @param animatorRef アニマーションのref
 * @returns
 */
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
  const [infectionRadius, setInfectionRadius] = useState(
    config.infectionRadius,
  );
  // betaAgent: 個体ベースモデルの感染率パラメータ（接触時の感染率）
  const [betaAgent, setBetaAgent] = useState(config.beta);
  const [gamma, setGamma] = useState(config.gamma);
  const [initI, setInitI] = useState(config.initialInfected);
  const [fatality, setFatality] = useState(config.fatality);

  // キャンバスサイズを状態として保持（refの変更を検知するため）
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // キャンバスマウントとリサイズを監視
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = mainCanvasRef.current;
      if (canvas) {
        setCanvasSize({ width: canvas.width, height: canvas.height });
      }
    };

    // 初回実行（キャンバスマウント時）
    updateCanvasSize();

    // リサイズイベントを監視
    window.addEventListener('resize', updateCanvasSize);

    // 定期的にチェック（キャンバスのマウント遅延に対応）
    const interval = setInterval(updateCanvasSize, 100);
    const timeout = setTimeout(() => clearInterval(interval), 1000);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [mainCanvasRef]);

  const baseId = useId();
  const idPopN = `${baseId}-popN`;
  const idInfectionRadius = `${baseId}-infectionRadius`;
  const idBeta = `${baseId}-beta`;
  const idGamma = `${baseId}-gamma`;
  const idInitI = `${baseId}-initI`;
  const idFatality = `${baseId}-fatality`;

  // 接触範囲内の期待人数を推定（接触者数の推定）
  // 計算式: 接触者数 = 人口密度 × 接触範囲の面積
  //        = (人口 / キャンバス面積) × π × 接触半径²
  const canvasInfo = useMemo(() => {
    if (!canvasSize.width || !canvasSize.height) {
      return {
        width: 0,
        height: 0,
        area: 0,
        contactPerDay: 10,
      };
    }

    const canvasArea = canvasSize.width * canvasSize.height;
    const density = popN / canvasArea; // 人口密度 = N / A
    const contactArea = Math.PI * infectionRadius * infectionRadius; // π × r²
    const expectedContacts = density * contactArea; // (N/A) × π × r²

    return {
      width: canvasSize.width,
      height: canvasSize.height,
      area: canvasArea,
      contactPerDay: Math.max(1, Math.round(expectedContacts)),
    };
  }, [canvasSize.width, canvasSize.height, popN, infectionRadius]);

  const estimatedContactPerDay = canvasInfo.contactPerDay;

  // betaAnalytical を計算（解析的モデルとの比較用）
  // 計算式: β_analytical = (接触者数 / 人口) × β_agent
  const betaAnalytical = useMemo(() => {
    if (popN === 0) return 0;
    return (estimatedContactPerDay / popN) * betaAgent;
  }, [estimatedContactPerDay, popN, betaAgent]);

  // R₀ を計算（基本再生産数）
  // 計算式: R₀ = S(0) × β_analytical / γ
  const r0 = useMemo(() => {
    if (gamma === 0) return 0;
    const s0 = popN - initI; // S(0) = 初期感受性者数
    return (s0 * betaAnalytical) / gamma;
  }, [betaAnalytical, gamma, popN, initI]);

  const handleApply = () => {
    applyConfig(
      {
        populationN: Math.max(1, Math.floor(popN)),
        infectionRadius: Math.max(1, infectionRadius),
        beta: Math.max(0, betaAgent), // betaAgent: 接触時の感染率パラメータ
        gamma: Math.max(0, gamma),
        initialInfected: Math.max(0, Math.floor(initI)),
        fatality: Math.min(1, Math.max(0, fatality)),
      },
      mainCanvasRef,
      animatorRef,
    );
  };

  return (
    <div className="fixed top-2 left-1 right-1 sm:left-auto sm:right-2 bg-black/50 text-white p-2 rounded-md text-[12px] leading-[1.4] font-sans z-10 max-h-[calc(100vh-1rem)] overflow-y-auto">
      <div className="font-bold mb-2 text-[13px]">個体ベースモデル</div>

      {/* 人口 */}
      <div className="row my-1 whitespace-nowrap">
        <label htmlFor={idPopN} className="inline-block w-[90px] sm:w-[110px]">
          人口 N
        </label>
        <input
          id={idPopN}
          type="number"
          min={1}
          max={5000}
          step={1}
          className="w-[80px]"
          value={popN}
          onChange={(e) => setPopN(Number(e.target.value))}
        />
      </div>

      {/* 接触半径 */}
      <div className="row my-1 whitespace-nowrap">
        <label
          htmlFor={idInfectionRadius}
          className="inline-block w-[90px] sm:w-[110px]"
        >
          接触半径
        </label>
        <input
          id={idInfectionRadius}
          type="number"
          min={1}
          max={100}
          step={1}
          className="w-[80px]"
          value={infectionRadius}
          onChange={(e) => setInfectionRadius(Number(e.target.value))}
        />
      </div>

      {/* β (接触時) */}
      <div className="row my-1 whitespace-nowrap">
        <label htmlFor={idBeta} className="inline-block w-[90px] sm:w-[110px]">
          β (接触時)
        </label>
        <input
          id={idBeta}
          type="number"
          min={0}
          max={5}
          step={0.01}
          className="w-[80px]"
          value={betaAgent}
          onChange={(e) => setBetaAgent(Number(e.target.value))}
        />
      </div>

      {/* 回復率 γ */}
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

      {/* 初期感染者数 */}
      <div className="row my-1 whitespace-nowrap">
        <label htmlFor={idInitI} className="inline-block w-[90px] sm:w-[110px]">
          初期感染者数
        </label>
        <input
          id={idInitI}
          type="number"
          min={0}
          max={5000}
          step={1}
          className="w-[80px]"
          value={initI}
          onChange={(e) => setInitI(Number(e.target.value))}
        />
      </div>

      {/* 致死率 */}
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

      {/* 推定値の表示 */}
      <div className="mt-2 pt-2 border-t border-white/20">
        <div className="font-bold mb-1 text-[11px]">推定値</div>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between">
            <span className="opacity-80">キャンバス:</span>
            <span className="font-mono text-[10px]">
              {canvasInfo.width} × {canvasInfo.height}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-80">面積:</span>
            <span className="font-mono text-[10px]">
              {canvasInfo.area.toLocaleString()} px²
            </span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-80">人口密度:</span>
            <span className="font-mono text-[10px]">
              {canvasInfo.area > 0 ? (popN / canvasInfo.area).toFixed(6) : '0'}{' '}
              人/px²
            </span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-80">接触者数 (推定):</span>
            <span className="font-mono font-bold">
              {estimatedContactPerDay}人
            </span>
          </div>
          <div className="text-[10px] opacity-60">= 密度 × π × 接触半径²</div>
        </div>
      </div>

      {/* 換算値の表示 */}
      <div className="mt-2 pt-2 border-t border-white/20">
        <div className="font-bold mb-1 text-[11px]">解析モデル換算値</div>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between">
            <span className="opacity-80">β (解析的):</span>
            <span className="font-mono font-bold">
              {betaAnalytical.toFixed(6)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-80">γ (回復率):</span>
            <span className="font-mono font-bold">{gamma.toFixed(6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-80">R₀:</span>
            <span className="font-mono font-bold">{r0.toFixed(2)}</span>
          </div>
        </div>
        <div className="text-[10px] opacity-60 mt-1">
          β解析 = (接触者数/人口) × βエージェント
        </div>
      </div>

      <button
        type="button"
        className="mt-3 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded cursor-pointer transition-colors"
        onClick={handleApply}
      >
        適用
      </button>
      <div className="mt-1 opacity-70 text-[11px]">
        数値を変更して「適用」を押してください
      </div>
    </div>
  );
};
