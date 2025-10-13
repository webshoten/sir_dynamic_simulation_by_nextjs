// 時系列チャートの描画
export function drawChart(
    history: { t: number; s: number; i: number; r: number }[],
    chartCanvas: HTMLCanvasElement,
    chartCtx: CanvasRenderingContext2D,
    config: {
        populationN: number;
        historyMax: number;
        colors: { S: string; I: string; R: string };
    },
) {
    if (!chartCtx || !chartCanvas) return;
    const w = chartCanvas.clientWidth;
    const h = chartCanvas.clientHeight;
    chartCtx.clearRect(0, 0, w, h);
    chartCtx.save();
    chartCtx.translate(0.5, 0.5);

    // 軸と枠
    chartCtx.strokeStyle = "rgba(255,255,255,0.4)";
    chartCtx.strokeRect(0, 0, w - 1, h - 1);

    if (history.length === 0) {
        chartCtx.restore();
        return;
    }

    // yスケール: 0..N
    const n = config.populationN;
    const padL = 6;
    const padR = 6;
    const padT = 4;
    const padB = 4; //左、右、上、下のパディング
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const x = (idx: number) =>
        padL + (idx / Math.max(1, config.historyMax - 1)) * plotW;
    const y = (val: number) => padT + (1 - val / n) * plotH;

    const series: { key: "s" | "i" | "r"; color: string }[] = [
        { key: "s", color: config.colors.S },
        { key: "i", color: config.colors.I },
        { key: "r", color: config.colors.R },
    ];

    for (const { key, color } of series) {
        chartCtx.beginPath();
        for (let i = 0; i < history.length; i++) {
            const px = x(i);
            const py = y(history[i]?.[key] || 0);
            if (i === 0) chartCtx.moveTo(px, py);
            else chartCtx.lineTo(px, py);
        }
        chartCtx.strokeStyle = color;
        chartCtx.lineWidth = 1.5;
        chartCtx.stroke();
    }

    chartCtx.restore();
}
