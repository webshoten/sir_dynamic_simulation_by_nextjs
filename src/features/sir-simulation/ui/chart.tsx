/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
'use client';

import type { RefObject } from 'react';

export const Chart = ({
  chartCanvasRef,
  metricsRef,
}: {
  chartCanvasRef: RefObject<HTMLCanvasElement | null>;
  metricsRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div id="chart-wrap" className="fixed right-2 bottom-2 z-[5]">
      <canvas
        id="chart"
        ref={chartCanvasRef}
        width={480}
        height={160}
        className="bg-black/50 rounded-md block"
      />
      <div
        id="metrics"
        ref={metricsRef}
        className="text-black font-sans text-[11px] opacity-90 text-right"
      >
        S/I/R 時系列
      </div>
    </div>
  );
};
