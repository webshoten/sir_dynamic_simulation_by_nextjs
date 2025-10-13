import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { createAnimator } from "../logic/animator";
import { drawChart } from "../logic/draw-chart";
import { drawMetric } from "../logic/draw-metric";
import { updatePopulation } from "../logic/update-population";
import { useSimStore } from "../state/sim-store";

export const useSirAnimation = ({
    mainCanvasRef,
    mainCtxRef,
    chartCanvasRef,
    chartCtxRef,
    metricsRef,
}: {
    mainCanvasRef: RefObject<HTMLCanvasElement | null>;
    mainCtxRef: RefObject<CanvasRenderingContext2D | null>;
    chartCanvasRef: RefObject<HTMLCanvasElement | null>;
    chartCtxRef: RefObject<CanvasRenderingContext2D | null>;
    metricsRef: RefObject<HTMLDivElement | null>;
}) => {
    const animatorRef = useRef<ReturnType<typeof createAnimator> | null>(null);

    useEffect(() => {
        const canvas = mainCanvasRef.current;
        const ctx = mainCtxRef.current;
        const chartCanvas = chartCanvasRef.current;
        const chartCtx = chartCtxRef.current;
        if (!canvas || !ctx) return;

        // 初期化
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        const simStore = useSimStore.getState();
        simStore.reset({ width: w, height: h });

        const animator = createAnimator((_dt, _tt) => {
            // 毎フレーム最新のstoreを取得
            const store = useSimStore.getState();
            const agents = store.agents;

            // クリア
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // エージェントを更新
            agents.forEach((agent) => {
                agent.update(
                    canvas,
                    ctx,
                    store.config.colors,
                    store.config.infectionRadius,
                );
            });
            // 更新
            if (_tt > 0) {
                const { s, i, r } = updatePopulation(
                    agents,
                    _dt,
                    _tt,
                    canvas,
                    ctx,
                    store.config,
                );
                store.setSimTimeSec(_tt);
                store.pushHistory({ t: _tt, s, i, r });
                if (chartCtx && chartCanvas) {
                    drawChart(
                        store.history,
                        chartCanvas,
                        chartCtx,
                        store.config,
                    );
                }
                drawMetric(metricsRef.current, s, {
                    populationN: store.config.populationN,
                    fatality: store.config.fatality,
                });
            }
        });

        animator.start();
        animatorRef.current = animator;
        return () => animator.stop();
    }, [mainCanvasRef, mainCtxRef, chartCanvasRef, chartCtxRef, metricsRef]);

    return animatorRef;
};
