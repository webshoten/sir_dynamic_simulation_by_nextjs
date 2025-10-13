import type { RefObject } from "react";
import { useEffect } from "react";

export const useResizeCanvas = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    ctxRef: RefObject<CanvasRenderingContext2D | null>,
) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement ?? document.body;

        const resizeTo = (width: number, height: number) => {
            const dpr = window.devicePixelRatio || 1;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);

            const ctx = ctxRef.current ?? canvas.getContext("2d");
            if (ctx) {
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctxRef.current = ctx;
            }
        };

        // 初期化
        const rect = parent.getBoundingClientRect();
        resizeTo(rect.width, rect.height);

        // 監視
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                resizeTo(width, height);
            }
        });
        ro.observe(parent);

        const onWindowResize = () => {
            const r = parent.getBoundingClientRect();
            resizeTo(r.width, r.height);
        };
        window.addEventListener("resize", onWindowResize);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", onWindowResize);
        };
    }, [canvasRef, ctxRef]);
};
