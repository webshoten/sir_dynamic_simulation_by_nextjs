import type { Agent } from "./agent";

export function countSirState(
    agents: Agent[],
) {
    let s = 0;
    let i = 0;
    let r = 0;
    for (let k = 0; k < agents.length; k++) {
        const st = agents[k]?.state;
        if (st === "S") s++;
        else if (st === "I") i++;
        else if (st === "R") r++;
    }
    return { s, i, r };
}

// 左上 S/I/Rカウント表示用
export function drawCount(
    sCount: number,
    iCount: number,
    rCount: number,
    timeSec: number,
    mainCanvasCtx: CanvasRenderingContext2D,
    colors: { S: string; I: string; R: string },
): void {
    const sText = `S(未感染者): ${sCount}`;
    const iText = `I(感染者): ${iCount}`;
    const rText = `R(回復者): ${rCount}`;
    const tText = `t=${timeSec.toFixed(1)}s`;
    const sep = "  ";

    const fullText = `${sText}${sep}${iText}${sep}${rText}${sep}${tText}`;

    mainCanvasCtx.save();
    mainCanvasCtx.font = "14px sans-serif";
    mainCanvasCtx.textBaseline = "top";
    const padding = 8;
    const x = 8;
    const y = 8;
    const textWidth = mainCanvasCtx.measureText(fullText).width;
    const textHeight = 16;
    mainCanvasCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
    mainCanvasCtx.fillRect(
        x - padding / 2,
        y - padding / 2,
        textWidth + padding,
        textHeight + padding,
    );

    let cursorX = x;
    mainCanvasCtx.fillStyle = colors.S;
    mainCanvasCtx.fillText(sText, cursorX, y);
    cursorX += mainCanvasCtx.measureText(`${sText}${sep}`).width;

    mainCanvasCtx.fillStyle = colors.I;
    mainCanvasCtx.fillText(iText, cursorX, y);
    cursorX += mainCanvasCtx.measureText(`${iText}${sep}`).width;

    mainCanvasCtx.fillStyle = colors.R;
    mainCanvasCtx.fillText(rText, cursorX, y);
    cursorX += mainCanvasCtx.measureText(`${rText}${sep}`).width;

    mainCanvasCtx.fillStyle = "#ffffff";
    mainCanvasCtx.fillText(tText, cursorX, y);
    mainCanvasCtx.restore();
}
