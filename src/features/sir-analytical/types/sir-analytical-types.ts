/**
 * SIRモデルの解析的シミュレーションのパラメータ
 */
export interface SirParameters {
    /** 総人口数 */
    population: number;
    /** 接触者数（1人1日あたり） */
    contactPerDay: number;
    /** 感染率（%表記、例: 2 = 2%） */
    infectionRate: number;
    /** 回復までの日数 */
    recoveryDays: number;
    /** 初期感染者数 */
    initialInfected: number;
    /** シミュレーション最大日数 */
    maxDays: number;
    /** 時間刻み幅 */
    dt: number;
}

/**
 * SIRモデルの計算結果
 */
export interface SirResult {
    /** 時間配列（日数） */
    time: number[];
    /** 感受性保持者数の時系列 */
    susceptible: number[];
    /** 感染者数の時系列 */
    infected: number[];
    /** 回復者数の時系列 */
    recovered: number[];
}

/**
 * SIRモデルの係数
 */
export interface SirCoefficients {
    /** 感染率 β */
    beta: number;
    /** 回復率 γ */
    gamma: number;
    /** 基本再生産数 R₀ */
    r0: number;
}

/**
 * SIRモデルの状態（S, I, R）
 */
export interface SirState {
    s: number;
    i: number;
    r: number;
}
