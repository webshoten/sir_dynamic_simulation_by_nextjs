import type { SirState, Vector2 } from "../types/sir-types";

export class Agent {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: Vector2;
    state: SirState;
    infectedAt: number | null;

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        velocity: Vector2,
    ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.state = "S";
        this.infectedAt = null;
    }

    draw(
        c: CanvasRenderingContext2D,
        colors: { S: string; I: string; R: string },
        infectionRadius?: number,
    ): void {
        // 感染者の場合、接触半径を薄く表示
        if (this.state === "I" && infectionRadius) {
            c.beginPath();
            c.arc(this.x, this.y, infectionRadius, 0, Math.PI * 2, false);
            c.strokeStyle = "rgba(255, 100, 100, 0.3)"; // やや濃い赤
            c.lineWidth = 1.5;
            c.stroke();
            c.fillStyle = "rgba(255, 100, 100, 0.1)"; // 薄い赤の塗りつぶし
            c.fill();
        }

        // エージェント本体を描画
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = colors[this.state] || this.color;
        c.fill();
    }

    update(
        canvas: HTMLCanvasElement,
        c: CanvasRenderingContext2D,
        colors: { S: string; I: string; R: string },
        infectionRadius?: number,
    ) {
        // 位置を更新
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // 周期境界条件（半径込み）
        if (this.x < -this.radius) this.x = canvas.width + this.radius; //左端
        if (this.x > canvas.width + this.radius) this.x = -this.radius; //右端
        if (this.y < -this.radius) this.y = canvas.height + this.radius; //上端
        if (this.y > canvas.height + this.radius) this.y = -this.radius; //下端

        // 描画
        this.draw(c, colors, infectionRadius);
    }
}
