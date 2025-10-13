'use client';

import { useId } from 'react';
import type { UseSirRungeKuttaReturn } from '../hooks/use-sir-runge-kutta';

interface ParameterPanelProps {
  hook: UseSirRungeKuttaReturn;
}

export function ParameterPanel({ hook }: ParameterPanelProps) {
  const {
    parameters,
    coefficients,
    setContactPerDay,
    setInfectionRate,
    setRecoveryDays,
    setInitialInfected,
  } = hook;

  // ユニークなID生成
  const contactId = useId();
  const infectionId = useId();
  const recoveryId = useId();
  const initialId = useId();

  return (
    <div className="w-full h-full p-6 bg-gray-900/50 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">パラメータ</h2>

      {/* 接触者数 */}
      <div className="mb-6">
        <label htmlFor={contactId} className="block text-white mb-2">
          接触者数 (1人1日あたり):{' '}
          <span className="font-bold">{parameters.contactPerDay}</span>
        </label>
        <input
          type="range"
          id={contactId}
          min="0"
          max="100"
          value={parameters.contactPerDay}
          onChange={(e) => setContactPerDay(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* 感染率 */}
      <div className="mb-6">
        <label htmlFor={infectionId} className="block text-white mb-2">
          感染率 (1人1日あたり):{' '}
          <span className="font-bold">
            {parameters.infectionRate.toFixed(2)}
          </span>
        </label>
        <input
          type="range"
          id={infectionId}
          min="0.01"
          max="0.10"
          step="0.01"
          value={parameters.infectionRate}
          onChange={(e) => setInfectionRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* 回復までの日数 */}
      <div className="mb-6">
        <label htmlFor={recoveryId} className="block text-white mb-2">
          回復までの日数:{' '}
          <span className="font-bold">{parameters.recoveryDays}</span>
        </label>
        <input
          type="range"
          id={recoveryId}
          min="1"
          max="50"
          value={parameters.recoveryDays}
          onChange={(e) => setRecoveryDays(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* 初期感染者数 */}
      <div className="mb-6">
        <label htmlFor={initialId} className="block text-white mb-2">
          初期感染者数:{' '}
          <span className="font-bold">{parameters.initialInfected}</span>
        </label>
        <input
          type="range"
          id={initialId}
          min="0"
          max="20"
          value={parameters.initialInfected}
          onChange={(e) => setInitialInfected(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* 計算値の表示 */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">計算値</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-white">
            <span className="text-gray-300">β (感染率):</span>
            <span className="font-mono font-bold">
              {coefficients.beta.toFixed(6)}
            </span>
          </div>

          <div className="flex items-center justify-between text-white">
            <span className="text-gray-300">γ (回復率):</span>
            <span className="font-mono font-bold">
              {coefficients.gamma.toFixed(6)}
            </span>
          </div>

          <div className="flex items-center justify-between text-white">
            <span className="text-gray-300">R₀ (基本再生産数):</span>
            <span className="font-mono font-bold">
              {coefficients.r0.toFixed(6)}
            </span>
          </div>
        </div>
      </div>

      {/* 補足情報 */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded text-sm text-gray-400">
        <p className="mb-2">人口: {parameters.population.toLocaleString()}人</p>
        <p>シミュレーション期間: {parameters.maxDays}日</p>
      </div>
    </div>
  );
}
