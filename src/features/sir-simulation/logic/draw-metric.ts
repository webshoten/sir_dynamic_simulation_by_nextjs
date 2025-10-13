export const drawMetric = (
    metricsEl: HTMLDivElement | null,
    s: number,
    config: { populationN: number; fatality: number },
) => {
    if (metricsEl) {
        const cumulativeInfected = config.populationN - s;
        const cumulativeDeaths = Math.round(
            cumulativeInfected * config.fatality,
        );
        metricsEl.textContent =
            `S/I/R 時系列 | 累積感染者: ${cumulativeInfected} | 累積死亡者(致死率${
                (config.fatality * 100).toFixed(1)
            }%): ${cumulativeDeaths}`;
    }
};
