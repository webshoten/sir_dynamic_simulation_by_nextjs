import type { Agent } from "./agent";
import { countSirState, drawCount } from "./draw-count";

export function updatePopulation(
    agents: Agent[],
    dt: number,
    simTimeSec: number,
    mainCanvas: HTMLCanvasElement,
    mainCanvasCtx: CanvasRenderingContext2D,
    config: {
        infectionRadius: number;
        beta: number; // betaAgent: 接触あたりの感染率パラメータ
        gamma: number;
        colors: { S: string; I: string; R: string };
    },
) {
    const toInfect = new Set<number>();
    const toRecover = new Set<number>();

    const infectionRadius = config.infectionRadius;
    const r2 = infectionRadius * infectionRadius;

    // 計算式（ポアソン過程からの感染・回復確率）:
    // P(感染) = 1 - exp(-β_agent × dt)
    // P(回復) = 1 - exp(-γ × dt)
    const betaAgent = config.beta;
    const pInfect = 1 - Math.exp(-betaAgent * dt);
    const pRecover = 1 - Math.exp(-config.gamma * dt);

    for (let i = 0; i < agents.length; i++) {
        if (agents?.[i]?.state !== "I") continue;
        const ix = agents?.[i]?.x;
        const iy = agents?.[i]?.y;
        // 回復判定
        if (Math.random() < pRecover) {
            toRecover.add(i); // 回復判定
        }
        for (let j = 0; j < agents.length; j++) {
            if (agents?.[j]?.state !== "S") continue;
            const jx = agents?.[j]?.x;
            const jy = agents?.[j]?.y;
            if (!ix || !iy || !jx || !jy) continue;
            const d2 = distanceSquaredTorus(
                ix,
                iy,
                jx,
                jy,
                mainCanvas.width,
                mainCanvas.height,
            );
            if (d2 <= r2) {
                if (Math.random() < pInfect) toInfect.add(j); // 感染判定
            }
        }
    }

    toInfect.forEach((idx: number) => {
        const agent = agents[idx];
        if (!agent) return;
        agent.state = "I";
        agent.infectedAt = simTimeSec;
    });

    toRecover.forEach((idx) => {
        const agent = agents[idx];
        if (!agent) return;
        agent.state = "R";
    });

    const { s, i, r } = countSirState(agents);
    drawCount(s, i, r, simTimeSec, mainCanvasCtx, config.colors);
    return { s, i, r };
}

// トーラス（周期境界）での距離二乗
function distanceSquaredTorus(
    ax: number,
    ay: number,
    bx: number,
    by: number,
    width: number,
    height: number,
): number {
    let dx = Math.abs(ax - bx);
    let dy = Math.abs(ay - by);
    dx = Math.min(dx, width - dx);
    dy = Math.min(dy, height - dy);
    return dx * dx + dy * dy;
}
