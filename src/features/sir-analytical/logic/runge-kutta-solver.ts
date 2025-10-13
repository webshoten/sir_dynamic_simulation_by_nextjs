import type { SirParameters, SirResult } from "../types/sir-analytical-types";

/**
 * dS/dt = -β * S * I
 */
function f1(s: number, i: number, beta: number): number {
    return -1 * beta * s * i;
}

/**
 * dI/dt = β * S * I - γ * I
 */
function f2(s: number, i: number, beta: number, gamma: number): number {
    return beta * s * i - gamma * i;
}

/**
 * dR/dt = γ * I
 */
function f3(i: number, gamma: number): number {
    return gamma * i;
}

/**
 * 4次ルンゲクッタ法でSIRモデルを解く
 */
export function solveSIR(params: SirParameters): SirResult {
    const {
        population,
        contactPerDay,
        infectionRate,
        recoveryDays,
        initialInfected,
        maxDays,
        dt,
    } = params;

    // β と γ の計算
    const beta = (infectionRate * contactPerDay) / population;
    const gamma = 1.0 / recoveryDays;

    // 初期状態
    let s = population - initialInfected;
    let i = initialInfected;
    let r = 0;

    // 結果を格納する配列
    const timeArray: number[] = [];
    const sArray: number[] = [];
    const iArray: number[] = [];
    const rArray: number[] = [];

    // ルンゲクッタ法のメインループ
    for (let t = 0; t < maxDays; t += dt) {
        // 現在の状態を記録
        timeArray.push(t);
        sArray.push(s);
        iArray.push(i);
        rArray.push(r);

        // k1の計算
        const k1_s = dt * f1(s, i, beta);
        const k1_i = dt * f2(s, i, beta, gamma);
        const k1_r = dt * f3(i, gamma);

        // k2の計算
        const k2_s = dt * f1(s + k1_s / 2.0, i + k1_i / 2.0, beta);
        const k2_i = dt * f2(s + k1_s / 2.0, i + k1_i / 2.0, beta, gamma);
        const k2_r = dt * f3(i + k1_i / 2.0, gamma);

        // k3の計算
        const k3_s = dt * f1(s + k2_s / 2.0, i + k2_i / 2.0, beta);
        const k3_i = dt * f2(s + k2_s / 2.0, i + k2_i / 2.0, beta, gamma);
        const k3_r = dt * f3(i + k2_i / 2.0, gamma);

        // k4の計算
        const k4_s = dt * f1(s + k3_s, i + k3_i, beta);
        const k4_i = dt * f2(s + k3_s, i + k3_i, beta, gamma);
        const k4_r = dt * f3(i + k3_i, gamma);

        // 次の状態を計算
        s = s + (k1_s + 2.0 * k2_s + 2.0 * k3_s + k4_s) / 6.0;
        i = i + (k1_i + 2.0 * k2_i + 2.0 * k3_i + k4_i) / 6.0;
        r = r + (k1_r + 2.0 * k2_r + 2.0 * k3_r + k4_r) / 6.0;
    }

    return {
        time: timeArray,
        susceptible: sArray,
        infected: iArray,
        recovered: rArray,
    };
}

/**
 * SIRモデルの係数（β, γ, R₀）を計算
 */
export function calculateCoefficients(
    params: SirParameters,
): { beta: number; gamma: number; r0: number } {
    const {
        population,
        contactPerDay,
        infectionRate,
        recoveryDays,
        initialInfected,
    } = params;

    const beta = (infectionRate * contactPerDay) / population;
    const gamma = 1.0 / recoveryDays;
    const s0 = population - initialInfected;
    const r0 = (s0 * beta) / gamma;

    return { beta, gamma, r0 };
}
