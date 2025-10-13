export type StepFn = (dtSec: number, simTimeSec: number) => void;

export function createAnimator(step: StepFn) {
    let lastTs: number | null = null;
    let simTimeSec = 0;
    let rafId: number | null = null;

    const loop = (ts: number) => {
        if (lastTs == null) lastTs = ts;
        const dt = Math.max(0, (ts - lastTs) / 1000);
        lastTs = ts;
        simTimeSec += dt;

        step(dt, simTimeSec);
        rafId = requestAnimationFrame(loop);
    };

    return {
        start() {
            if (rafId != null) return;
            rafId = requestAnimationFrame(loop);
        },
        stop() {
            if (rafId != null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            lastTs = null;
            simTimeSec = 0;
        },
    };
}
