import { useCallback, useState } from "react";

export type SirParams = {
    popN: number;
    beta: number;
    gamma: number;
    initI: number;
    fatality: number;
};

const defaultParams: SirParams = {
    popN: 1000,
    beta: 0.8,
    gamma: 0.2,
    initI: 10,
    fatality: 0.01,
};

export const useSirSimulation = (initial: Partial<SirParams> = {}) => {
    const [params, setParams] = useState<SirParams>({
        ...defaultParams,
        ...initial,
    });

    const apply = useCallback((next: Partial<SirParams>) => {
        setParams((p) => ({ ...p, ...next }));
    }, []);

    return { params, apply } as const;
};
