'use client';

import { useSirRungeKutta } from '../hooks/use-sir-runge-kutta';
import { AnalyticalChart } from './analytical-chart';
import { ParameterPanel } from './parameter-panel';

export const SirAnalyticalMain = () => {
  const hook = useSirRungeKutta();

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full h-full p-4 md:p-6 lg:p-8">
        {/* ヘッダー */}
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            SIRモデルの解析的シミュレーション
          </h1>
          <p className="text-gray-400 mt-2">
            4次ルンゲクッタ法による常微分方程式の数値解析
          </p>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-5rem)]">
          {/* グラフエリア（左側・大きめ） */}
          <div className="lg:col-span-2 bg-gray-900/50 rounded-lg p-4 h-full">
            <AnalyticalChart result={hook.result} />
          </div>

          {/* パラメータパネル（右側） */}
          <div className="lg:col-span-1 h-full">
            <ParameterPanel hook={hook} />
          </div>
        </div>
      </div>
    </div>
  );
};
