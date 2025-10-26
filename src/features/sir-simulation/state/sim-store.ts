import { create } from "zustand";
import type { Agent } from "@/features/sir-simulation/logic/agent";
import { createPopulation } from "../logic/create-population";

export type HistoryPoint = { t: number; s: number; i: number; r: number };

type SimState = {
    lastTs: number | null;
    simTimeSec: number;
    history: HistoryPoint[];
    historyMax: number;
    config: {
        populationN: number;
        infectionRadius: number;
        beta: number;
        gamma: number;
        initialInfected: number;
        agentRadius: number;
        fatality: number;
        minSpeed: number;
        maxSpeed: number;
        colors: { S: string; I: string; R: string };
        historyMax: number;
    };
    agents: Agent[];
    cumulativeInfected: number;
    cumulativeDeaths: number;
    reset: ({ width, height }: { width: number; height: number }) => void;
    resetWithConfig: (
        partial: Partial<SimState["config"]>,
        size: { width: number; height: number },
    ) => void;
    setConfig: (partial: Partial<SimState["config"]>) => void;
    /** シミュレーション時間（秒）を更新 */
    setSimTimeSec: (t: number) => void;
    pushHistory: (p: HistoryPoint) => void;
    setAgents: (list: Agent[]) => void;
    clearHistory: () => void;
    setCumulativeInfected: (n: number) => void;
    setCumulativeDeaths: (n: number) => void;
};

export const useSimStore = create<SimState>((set, get) => ({
    lastTs: null,
    simTimeSec: 0,
    history: [],
    historyMax: 3600,
    config: {
        populationN: 2000,
        // 接触半径の計算式: r = 0.039 × √(キャンバス面積)
        // 基準: 面積1,049,760 px²に対してr=40が適切
        // 40 / √1,049,760 ≈ 0.039
        infectionRadius: 40,
        beta: 0.03,
        gamma: 0.07,
        initialInfected: 2,
        agentRadius: 10,
        fatality: 0.02,
        minSpeed: 0.5,
        maxSpeed: 2.0,
        colors: {
            S: "hsl(210 80% 60%)",
            I: "hsl(0 80% 60%)",
            R: "hsl(120 60% 45%)",
        },
        historyMax: 3600,
    },
    agents: [],
    cumulativeInfected: 0,
    cumulativeDeaths: 0,
    reset: ({ width, height }: { width: number; height: number }) => {
        const { config } = get();

        // 接触半径を面積から計算
        // 計算式: r = 0.039 × √(面積)
        const area = width * height;
        const calculatedRadius = 0.039 * Math.sqrt(area);
        const infectionRadius = Math.round(calculatedRadius);

        const updatedConfig = { ...config, infectionRadius };

        set({
            lastTs: null,
            simTimeSec: 0,
            history: [],
            agents: [],
            config: updatedConfig,
        });
        set({
            agents: createPopulation({
                width,
                height,
                config: updatedConfig,
            }),
            historyMax: updatedConfig.historyMax,
        });
    },
    resetWithConfig: (partial, size) => {
        const currentConfig = get().config;

        // infectionRadiusが明示的に指定されていない場合は面積から計算
        let infectionRadius = partial.infectionRadius;
        if (infectionRadius === undefined) {
            const area = size.width * size.height;
            const calculatedRadius = 0.039 * Math.sqrt(area);
            infectionRadius = Math.round(calculatedRadius);
        }

        const updatedConfig = { ...currentConfig, ...partial, infectionRadius };

        set({
            lastTs: null,
            simTimeSec: 0,
            history: [],
            agents: [],
            config: updatedConfig,
        });

        set({
            agents: createPopulation({
                width: size.width,
                height: size.height,
                config: updatedConfig,
            }),
            historyMax: updatedConfig.historyMax,
        });
    },
    setConfig: (partial) =>
        set((s) => {
            const next = { ...s.config, ...partial };
            return { config: next, historyMax: next.historyMax };
        }),
    setSimTimeSec: (t) => set({ simTimeSec: t }),
    pushHistory: (p) =>
        set((s) => {
            const next = [...s.history, p];
            if (next.length > s.historyMax) next.shift();
            return { history: next };
        }),
    setAgents: (list) => set({ agents: list }),
    clearHistory: () => set({ history: [] }),
    setCumulativeInfected: (n) => set({ cumulativeInfected: n }),
    setCumulativeDeaths: (n) => set({ cumulativeDeaths: n }),
}));
