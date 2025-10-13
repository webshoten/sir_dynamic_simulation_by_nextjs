import type { SirParameters, SirResult } from "../types/sir-analytical-types";

/**
 * dS/dt = -β * S * I
 * @param betaAnalytical 解析的モデルの感染率係数（人口スケール）
 */
function f1(s: number, i: number, betaAnalytical: number): number {
    return -1 * betaAnalytical * s * i;
}

/**
 * dI/dt = β * S * I - γ * I
 * @param betaAnalytical 解析的モデルの感染率係数（人口スケール）
 */
function f2(
    s: number,
    i: number,
    betaAnalytical: number,
    gamma: number,
): number {
    return betaAnalytical * s * i - gamma * i;
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

    // 計算式:
    // β_analytical = (感染率/100 × 接触者数) / 人口
    // γ = 1 / 回復日数
    const betaAnalytical = ((infectionRate / 100) * contactPerDay) / population;
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
        const k1_s = dt * f1(s, i, betaAnalytical);
        const k1_i = dt * f2(s, i, betaAnalytical, gamma);
        const k1_r = dt * f3(i, gamma);

        // k2の計算
        const k2_s = dt * f1(s + k1_s / 2.0, i + k1_i / 2.0, betaAnalytical);
        const k2_i = dt *
            f2(s + k1_s / 2.0, i + k1_i / 2.0, betaAnalytical, gamma);
        const k2_r = dt * f3(i + k1_i / 2.0, gamma);

        // k3の計算
        const k3_s = dt * f1(s + k2_s / 2.0, i + k2_i / 2.0, betaAnalytical);
        const k3_i = dt *
            f2(s + k2_s / 2.0, i + k2_i / 2.0, betaAnalytical, gamma);
        const k3_r = dt * f3(i + k2_i / 2.0, gamma);

        // k4の計算
        const k4_s = dt * f1(s + k3_s, i + k3_i, betaAnalytical);
        const k4_i = dt * f2(s + k3_s, i + k3_i, betaAnalytical, gamma);
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
 * @returns betaAnalytical: 解析的モデルの感染率係数（人口スケール）
 */
export function calculateCoefficients(
    params: SirParameters,
): { betaAnalytical: number; gamma: number; r0: number } {
    const {
        population,
        contactPerDay,
        infectionRate,
        recoveryDays,
        initialInfected,
    } = params;

    // 計算式:
    // β_analytical = (感染率/100 × 接触者数) / 人口
    // γ = 1 / 回復日数
    // R₀ = S(0) × β / γ
    const betaAnalytical = ((infectionRate / 100) * contactPerDay) / population;
    const gamma = 1.0 / recoveryDays;
    const s0 = population - initialInfected; // S(0) = 初期感受性者数
    const r0 = (s0 * betaAnalytical) / gamma;

    return { betaAnalytical, gamma, r0 };
}
