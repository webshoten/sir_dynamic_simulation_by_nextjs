'use client';

import { useEffect, useRef } from 'react';
import { useSirAnimation } from '../hooks/use-sir-animation';
import { useSimStore } from '../state/sim-store';
import { Chart } from './chart';
import { HudPanel } from './hud-panel';
import { Sir } from './sir';

export const SirSimulationMain = () => {
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mainCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mainCanvasRef.current) {
      mainCtxRef.current = mainCanvasRef.current.getContext('2d');
    }
    if (chartCanvasRef.current) {
      chartCtxRef.current = chartCanvasRef.current.getContext('2d');
    }
  }, []);

  // SIRアニメーションを描画
  const animatorRef = useSirAnimation({
    mainCanvasRef,
    mainCtxRef,
    chartCanvasRef,
    chartCtxRef,
    metricsRef,
  });

  //configだけ監視
  const config = useSimStore((state) => state.config);

  return (
    <>
      <HudPanel
        config={config}
        mainCanvasRef={mainCanvasRef}
        animatorRef={animatorRef}
      />
      <Sir mainCanvasRef={mainCanvasRef} mainCtxRef={mainCtxRef} />
      <Chart chartCanvasRef={chartCanvasRef} metricsRef={metricsRef} />
    </>
  );
};
