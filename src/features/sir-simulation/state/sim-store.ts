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
        infectionRadius: 15,
        beta: 0.35,
        gamma: 0.125,
        initialInfected: 100,
        agentRadius: 10,
        fatality: 0.02,
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
        set({ lastTs: null, simTimeSec: 0, history: [], agents: [] });
        set({
            agents: createPopulation({
                width,
                height,
                config,
            }),
            historyMax: config.historyMax,
        });
    },
    resetWithConfig: (partial, size) => {
        set((s) => {
            const next = { ...s.config, ...partial };
            return { config: next };
        });
        get().reset(size);
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
