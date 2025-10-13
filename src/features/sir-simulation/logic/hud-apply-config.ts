import type { RefObject } from "react";
import { useSimStore } from "../state/sim-store";
import type { createAnimator } from "./animator";

export const applyConfig = (
    partial: Partial<ReturnType<typeof useSimStore.getState>["config"]>,
    mainCanvasRef: RefObject<HTMLCanvasElement | null>,
    animatorRef: RefObject<ReturnType<typeof createAnimator> | null>,
) => {
    const simStore = useSimStore.getState();
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    animatorRef.current?.stop();
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    simStore.resetWithConfig(partial, { width: w, height: h });
    animatorRef.current?.start();
};
