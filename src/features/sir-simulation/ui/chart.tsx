'use client';

import { type RefObject, useId } from 'react';

export const Chart = ({
  chartCanvasRef,
  metricsRef,
}: {
  chartCanvasRef: RefObject<HTMLCanvasElement | null>;
  metricsRef: RefObject<HTMLDivElement | null>;
}) => {
  const chartWrapId = useId();
  const chartId = useId();
  const metricsId = useId();

  return (
    <div id={chartWrapId} className="fixed right-2 bottom-2 z-[5]">
      <canvas
        id={chartId}
        ref={chartCanvasRef}
        width={480}
        height={160}
        className="bg-black/50 rounded-md block"
      />
      <div
        id={metricsId}
        ref={metricsRef}
        className="font-mono text-sm text-left bg-black px-2 py-1 rounded"
      >
        S(未感染者): 0 I(感染者): 0 R(回復者): 0 t=0.0s
      </div>
    </div>
  );
};
