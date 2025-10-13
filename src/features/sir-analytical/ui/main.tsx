'use client';

import { useSirRungeKutta } from '../hooks/use-sir-runge-kutta';
import { AnalyticalChart } from './analytical-chart';
import { ParameterPanel } from './parameter-panel';

export const SirAnalyticalMain = () => {
  const hook = useSirRungeKutta();

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div className="w-full h-full p-4 md:p-6 lg:p-8 flex flex-col">
        {/* メインコンテンツ */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
          {/* グラフエリア（左側・大きめ） */}
          <div className="lg:col-span-2 bg-gray-900/50 rounded-lg p-4 min-h-0 overflow-hidden">
            <AnalyticalChart result={hook.result} />
          </div>

          {/* パラメータパネル（右側） */}
          <div className="lg:col-span-1 min-h-0 overflow-hidden">
            <ParameterPanel hook={hook} />
          </div>
        </div>
      </div>
    </div>
  );
};
