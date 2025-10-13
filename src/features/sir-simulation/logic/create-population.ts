import type { Vector2 } from "../types/sir-types";
import { Agent } from "./agent";

function randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function randomVelocity(minSpeed: number, maxSpeed: number): Vector2 {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(minSpeed, maxSpeed);
    return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
}

// 個体群を再生成
export function createPopulation(
    {
        width,
        height,
        config,
    }: {
        width: number;
        height: number;
        config: {
            populationN: number;
            agentRadius: number;
            initialInfected: number;
            colors: { S: string; I: string; R: string };
        };
    },
): Agent[] {
    const arr = Array.from({ length: config.populationN }, (_, i) => {
        const radius = config.agentRadius;
        const x = randomBetween(radius, width - radius);
        const y = randomBetween(radius, height - radius);
        const isInfected =
            i < Math.min(config.initialInfected, config.populationN);
        const color = isInfected ? config.colors.I : config.colors.S;
        const velocity = randomVelocity(0.5, 2.0);
        const agent = new Agent(x, y, radius, color, velocity);
        if (isInfected) {
            agent.state = "I";
            agent.infectedAt = 0;
        }
        return agent;
    });
    return arr;
}
